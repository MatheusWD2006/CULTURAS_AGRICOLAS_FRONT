import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDadosUsuarioAPI, updateDadosUsuarioAPI } from '../../../services/UsuarioServico';
import WithAuth from '../../../security/WithAuth';
import Carregando from '../../common/Carregando';
import Alerta from '../../common/Alerta';
import CampoEntrada from '../../common/CampoEntrada';

function DadosUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [contato, setContato] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(true);

    const carregarDados = async () => {
        try {
            setCarregando(true);
            const dados = await getDadosUsuarioAPI();
            if (dados.status === "error") {
                setAlerta({ status: "error", message: dados.message });
            } else {
                setEmail(dados.e_mail || "");
                setNome(dados.nome_user || "");
                setContato(dados.contato || "");
                setTipo(dados.modo === 'A' ? "Administrador" : "Usuário Comum");
            }
        } catch (err) {
            navigate("/login", { replace: true });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const acaoSalvar = async (e) => {
        e.preventDefault();
        try {
            setCarregando(true);
            const dadosAtualizados = {
                nome_user: nome,
                contato: contato,
                passw: senha // se vazia, usecase preserva a senha atual
            };

            const retorno = await updateDadosUsuarioAPI(dadosAtualizados);
            if (retorno.status === "success") {
                setAlerta({ status: "success", message: "Dados atualizados com sucesso!" });
                setSenha("");
            } else {
                setAlerta({ status: "error", message: retorno.message || "Erro ao atualizar dados." });
            }
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
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

                        <form onSubmit={acaoSalvar}>
                            <h1 className="h3 mb-3 fw-normal">Meus Dados de Usuário</h1>

                            <CampoEntrada
                                value={email}
                                id="txtEmail"
                                name="email"
                                label="E-mail"
                                tipo="email"
                                onchange={() => {}}
                                requerido={true}
                                readonly={true}
                                maxCaracteres={50}
                            />

                            <CampoEntrada
                                value={tipo}
                                id="txtTipo"
                                name="tipo"
                                label="Tipo de Usuário"
                                tipo="text"
                                onchange={() => {}}
                                requerido={false}
                                readonly={true}
                                maxCaracteres={20}
                            />

                            <CampoEntrada
                                value={nome}
                                id="txtNome"
                                name="nome"
                                label="Nome"
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
                                msginvalido="Informe o contato"
                                requerido={true}
                                readonly={false}
                                maxCaracteres={14}
                            />

                            <CampoEntrada
                                value={senha}
                                id="txtSenha"
                                name="senha"
                                label="Nova Senha (deixe em branco para manter a atual)"
                                tipo="password"
                                onchange={e => setSenha(e.target.value)}
                                requerido={false}
                                readonly={false}
                                maxCaracteres={20}
                            />

                            <button className="w-100 btn btn-lg btn-primary" type="submit">
                                Salvar alterações
                            </button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default WithAuth(DadosUser);
