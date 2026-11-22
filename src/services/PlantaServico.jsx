import { getToken } from '../security/Autenticacao';

const API_URL = process.env.REACT_APP_ENDERECO_API || "http://localhost:3003";

export const getPlantasAPI = async () => {
    const response = await fetch(`${API_URL}/planta`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const getPlantaPorCodigoAPI = async codigo => {
    const response = await fetch(`${API_URL}/planta/${codigo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const deletePlantaPorCodigoAPI = async codigo => {
    const response = await fetch(`${API_URL}/planta/${codigo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const cadastraPlantaAPI = async (objeto, metodo) => {
    // Se o método for PUT, adicionamos o ID/código na URL
    let url = `${API_URL}/planta`;
    if (metodo === "PUT") {
        const id = objeto.id_planta || objeto.codigo;
        url = `${API_URL}/planta/${id}`;
    }

    const response = await fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
};
