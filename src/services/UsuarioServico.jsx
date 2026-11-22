import { getToken } from '../security/Autenticacao';

const API_URL = process.env.REACT_APP_ENDERECO_API || "http://localhost:3003";

// Cadastro de novo usuário (Requisito 3 - público)
export const cadastraUsuarioAPI = async (usuario) => {
    const response = await fetch(`${API_URL}/usuario/novo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });
    const data = await response.json();
    return data;
};

// Visualização dos dados do usuário logado (Requisito 4 - protegido)
export const getDadosUsuarioAPI = async () => {
    const response = await fetch(`${API_URL}/usuario/meusdados`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

// Atualização dos dados do usuário logado (Requisito 4 - protegido)
export const updateDadosUsuarioAPI = async (usuario) => {
    const response = await fetch(`${API_URL}/usuario/meusdados`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(usuario)
    });
    const data = await response.json();
    return data;
};
