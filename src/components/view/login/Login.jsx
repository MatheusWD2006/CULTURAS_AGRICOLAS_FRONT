import { useState, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../security/Autenticacao';
import Carregando from '../../common/Carregando';
import Alerta from '../../common/Alerta';
import CampoEntrada from '../../common/CampoEntrada';

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const acaoLogin = async (e) => {
        e.preventDefault();

        try {
            const body = {
                e_mail: email,
                passw: senha
            };

            setCarregando(true);

            const response = await fetch(
                `${process.env.REACT_APP_ENDERECO_API || "http://localhost:3003"}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const json = await response.json();

            if (json.auth === false) {
                setAlerta({
                    status: "error",
                    message: json.message
                });
            } else if (json.auth === true) {
                setAutenticado(true);
                gravaAutenticacao(json);
            }
        } catch (err) {
            setAlerta({
                status: "error",
                message: err.message
            });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({
                status: "error",
                message: err != null ? err.message : ""
            });
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/privado" />;
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />

                        <form onSubmit={acaoLogin}>
                            <h1 className="h3 mb-3 fw-normal">
                                Login de usuário
                            </h1>

                            <CampoEntrada
                                value={email}
                                id="txtEmail"
                                name="email"
                                label="E-mail"
                                tipo="email"
                                onchange={e => setEmail(e.target.value)}
                                msgvalido="Email OK"
                                msginvalido="Informe o email"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={50}
                            />

                            <CampoEntrada
                                value={senha}
                                id="txtSenha"
                                name="senha"
                                label="Senha"
                                tipo="password"
                                onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK"
                                msginvalido="Informe a senha"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={20}
                            />

                            <button
                                className="w-100 btn btn-lg btn-primary"
                                type="submit"
                            >
                                Efetuar login
                            </button>

                            <div className="mt-3 text-center">
                                <span>Não tem uma conta? </span>
                                <NavLink to="/registro">Cadastre-se aqui</NavLink>
                            </div>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Login;
