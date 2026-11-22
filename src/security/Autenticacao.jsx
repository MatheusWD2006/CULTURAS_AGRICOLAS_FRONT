import { jwtDecode } from "jwt-decode";

const NOMEAPP = 'culturas_agricolas_pw';

export const getToken = () => {
    try {
        const localStorageAutenticacao =
            localStorage.getItem(NOMEAPP + '/autenticacao');

        const autenticacao = localStorageAutenticacao
            ? JSON.parse(localStorageAutenticacao)
            : null;

        if (!autenticacao || autenticacao.auth === false || !autenticacao.token) {
            return null;
        }

        let decoded = jwtDecode(autenticacao.token);

        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            return null;
        }

        return autenticacao.token;
    } catch (e) {
        logout();
        return null;
    }
};

export const getUsuario = () => {
    try {
        const localStorageAutenticacao =
            localStorage.getItem(NOMEAPP + '/autenticacao');

        const autenticacao = localStorageAutenticacao
            ? JSON.parse(localStorageAutenticacao)
            : null;

        if (!autenticacao || autenticacao.auth === false || !autenticacao.token) {
            return null;
        }

        let decoded = jwtDecode(autenticacao.token);

        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            console.log('Token expirado');
            logout();
            return null;
        }

        return decoded.usuario;
    } catch (e) {
        logout();
        return null;
    }
};

export const gravaAutenticacao = (json) => {
    localStorage.setItem(
        NOMEAPP + '/autenticacao',
        JSON.stringify(json)
    );
};

export const logout = () => {
    localStorage.setItem(
        NOMEAPP + '/autenticacao',
        JSON.stringify({
            "auth": false,
            "token": ''
        })
    );
};
