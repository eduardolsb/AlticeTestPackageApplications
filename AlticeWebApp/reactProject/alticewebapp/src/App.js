import logo from './logo.svg';
import './App.css';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useEffect, useState } from 'react';


function App() {

  document.title = "MEO - 2023 Single page model by Carlos Barbosa®";

  const baseURL = "https://localhost:7160/api/MEO/Formulario";

  const [data, setData] = useState([]);

  const [formularioSelecionado, setFormularioSelecionado] = useState({
    id: '',
    name: '',
    email: '',
    telefone: ''
  });

  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const toogleModalIncluir = ()=> {
    setModalIncluir(!modalIncluir);
  }
  
  const toogleModalEditar = ()=> {
    setModalEditar(!modalEditar);
  }

  const toogleModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  }

  const handleChange = e=>{
    const {name, value} = e.target;
    setFormularioSelecionado({
      ...formularioSelecionado, [name]:value
    });
  }

  const pedidoGet = async() => {
    await axios
    .get(baseURL)
    .then(response => {
        setData(response.data);
    })
    .catch(error=> {
      console.log(error);
    })
  };

  const pedidoPost = async() => {
    let newdata = {
      name: formularioSelecionado.name,
      email: formularioSelecionado.email,
      telefone: formularioSelecionado.telefone
    };
    await axios
    .post(baseURL, newdata)
    .then(response => {
        setData(data.concat(response.data));
        toogleModalIncluir();
    })
    .catch(error=> {
      console.log(error);
    })
  };

  const selecionarFormulario=(formulario, opcao)=>{
    setFormularioSelecionado(formulario);
    (opcao==="Editar") ? toogleModalEditar() : toogleModalExcluir();
  };

  const pedidoPut = async() => {
    await axios
    .put(baseURL + "/" + formularioSelecionado.id, formularioSelecionado)
    .then(response => {
        let d = response.data;
        let dados = data;
        dados.map(a=>{
          if(a.id===formularioSelecionado.id){
              a.name = d.name;
              a.email = d.email;
              a.telefone = d.telefone;
          }
        });
        toogleModalEditar();
    })
    .catch(error=> {
      console.log(error);
    })
  };

  const pedidoDelete = async() => {
    await axios
    .delete(baseURL + "/" + formularioSelecionado.id)
    .then(response => {
        setData(data.filter(a=> a.id !== response.data));
        toogleModalExcluir();
    })
    .catch(error=> {
      console.log(error);
    })
  };

  useEffect(()=>{
    pedidoGet();    
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>MEO</h1>
        <h3>Quer saber sobre novidades?</h3>
        <button className="btn btn-sm btn-danger" onClick={()=>toogleModalIncluir()}>Quero receber novidades em nossa newsletter</button>
        <div className="space"></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(formulario=>(
              <tr key={formulario.id}>
                <td>{formulario.name}</td>
                <td>{formulario.email}</td>
                <td>{formulario.telefone}</td>
                <td>
                    <button className="btn btn-sm btn-primary" onClick={()=>selecionarFormulario(formulario, "Editar")}>Editar</button> {" "}
                    <button className="btn btn-sm btn-danger" onClick={()=>selecionarFormulario(formulario, "Excluir")}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="nova-cor-texto">


        <Modal isOpen={modalIncluir}>
          <ModalHeader>Incluir ao Formulário</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" className="form-control" name="name" onChange={handleChange} />
              <br/>
              <label>Email:</label>
              <input type="text" className="form-control" name="email" onChange={handleChange} />
              <br/>
              <label>Telefone:</label>
              <input type="text" className="form-control" name="telefone" onChange={handleChange} />
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-sm btn-primary"onClick={()=>pedidoPost()}>Incluir</button> {" "}
            <button className="btn btn-sm btn-danger" onClick={()=>toogleModalIncluir()}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID:</label>
              <input type="text" className="form-control" readOnly 
              value={formularioSelecionado && formularioSelecionado.id} />
              <br/>
              <label>Nome:</label>
              <input type="text" className="form-control" name="name" onChange={handleChange}
               value={formularioSelecionado && formularioSelecionado.name} />
              <br/>
              <label>Email:</label>
              <input type="text" className="form-control" name="email" onChange={handleChange}
               value={formularioSelecionado && formularioSelecionado.email} />
              <br/>
              <label>Telefone:</label>
              <input type="text" className="form-control" name="telefone" onChange={handleChange}
               value={formularioSelecionado && formularioSelecionado.telefone} />
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-sm btn-primary"onClick={()=>pedidoPut()}>Editar</button> {" "}
            <button className="btn btn-sm btn-danger" onClick={()=>toogleModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalExcluir}>
          <ModalBody>
            Deseja retirar o nome {formularioSelecionado && formularioSelecionado.name} da lista?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-sm btn-danger"onClick={()=>pedidoDelete()}>Sim</button> {" "}
            <button className="btn btn-sm btn-secondary" onClick={()=>toogleModalExcluir()}>Não</button>
          </ModalFooter>
        </Modal>

        </div>

      </header>
    </div>
  );
}

export default App;
