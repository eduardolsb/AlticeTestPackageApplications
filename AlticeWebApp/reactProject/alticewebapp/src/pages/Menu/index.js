import { Link } from 'react-router-dom';
import '../../App.css';

function MenuPrincipal () {

    return (
        <header>
            <h1>Meo Webpage®</h1>
            <div className='padding-10'>
                <Link to="/">Home</Link>
                <Link to="/contato">Contatos</Link>
            </div>
        </header>
    )

}

export default MenuPrincipal;