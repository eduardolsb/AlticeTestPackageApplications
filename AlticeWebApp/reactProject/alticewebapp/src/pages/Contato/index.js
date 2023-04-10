import meologo from '../../Assets/logo.png';
import MenuPrincipal from "../Menu"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css"

function Contato() {
    return(
    <div className="App">
      <MenuPrincipal/>
      <header className="App-header">
        <img src={meologo} className="App-logo" alt="logo" />
        

        <h1>Contatos</h1>
      </header>
    </div>
    
    )
}

export default Contato;