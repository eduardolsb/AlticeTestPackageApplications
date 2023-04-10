import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home';
import Contato from './Contato'

function RoutesApp () {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/contato" element={ <Contato/> } />
            </Routes>
        </BrowserRouter>
    )

}

export default RoutesApp;