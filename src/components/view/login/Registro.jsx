import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cadastraUsuarioAPI } from '../../../services/UsuarioServico';
import Carregando from '../../common/Carregando';
import Alerta from '../../common/Alerta';
import CampoEntrada from '../../common/CampoEntrada';

function Registro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [contato, setContato] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);

    const acaoCadastrar = async (e) => {
        e.preventDefault();

        try {
            setCarregando(true);
            const dados = {
                e_mail: email,
                passw: senha,
                nome_user: nome,
                contato: contato
            };

            const retorno = await cadastraUsuarioAPI(dados);

            if (retorno.status === "success") {
                setAlerta({
                    status: "success",
                    message: "Cadastro realizado com sucesso! Redirecionando para o login..."
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setAlerta({
                    status: "error",
                    message: retorno.message || "Erro ao cadastrar usuário."
                });
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

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />

                        <form onSubmit={acaoCadastrar}>
                            <h1 className="h3 mb-3 fw-normal">
                                Criar nova conta
                            </h1>

                            <CampoEntrada
                                value={email}
                                id="txtEmail"
                                name="email"
                                label="E-mail"
                                tipo="email"
                                onchange={e => setEmail(e.target.value)}
                                msgvalido="E-mail OK"
                                msginvalido="Informe o e-mail"
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

                            <CampoEntrada
                                value={nome}
                                id="txtNome"
                                name="nome"
                                label="Nome completo"
                                tipo="text"
                                onchange={e => setNome(e.target.value)}
                                msgvalido="Nome OK"
                                msginvalido="Informe o nome"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={50}
                            />

                            <CampoEntrada
                                value={contato}
                                id="txtContato"
                                name="contato"
                                label="Telefone / Contato"
                                tipo="text"
                                onchange={e => setContato(e.target.value)}
                                msgvalido="Contato OK"
                                msginvalido="Informe o telefone/contato"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={14}
                            />

                            <button
                                className="w-100 btn btn-lg btn-success"
                                type="submit"
                            >
                                Cadastrar
                            </button>

                            <div className="mt-3 text-center">
                                <span>Já tem conta? </span>
                                <NavLink to="/login">Fazer login</NavLink>
                            </div>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Registro;
