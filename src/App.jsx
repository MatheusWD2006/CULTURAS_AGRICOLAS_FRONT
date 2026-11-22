import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import Home from './components/view/Home';
import Sobre from './components/view/Sobre';
import Cultura from './components/view/culturas/Cultura';
import Planta from './components/view/plantas/Planta';
import Manejo from './components/view/manejos/Manejo';
import Login from './components/view/login/Login';
import Registro from './components/view/login/Registro';
import DadosUser from './components/view/login/dadosUser';

import MenuPublico from './components/MenuPublico';
import MenuPrivado from './components/MenuPrivado';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MenuPublico />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "sobre",
                element: <Sobre />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "registro",
                element: <Registro />
            }
        ]
    },
    {
        path: "/privado",
        element: <MenuPrivado />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "sobre",
                element: <Sobre />
            },
            {
                path: "plantas",
                element: <Planta />
            },
            {
                path: "culturas",
                element: <Cultura />
            },
            {
                path: "manejos",
                element: <Manejo />
            },
            {
                path: "meusdados",
                element: <DadosUser />
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
