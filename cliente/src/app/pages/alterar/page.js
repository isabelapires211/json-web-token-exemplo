'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './estilo.css';

 const form =  () => {
  const handlerAlterar= async (e) => {
    e.preventDefault();
    toast.error('Os dados alterado deu certo!')
  }

  return (
    <div>
      <h1>Alterar</h1>
      <form onSubmit={handlerAlterar}>
        <input
          placeholder='Nome'
          type="Nome"
         >
        </input>
        <input
          placeholder='Email'
          type='Email'
         >
        </input>
        <input
          placeholder='Senha'
          type='password'
        >
        </input>
        <button>Alterar</button>
        <ToastContainer/>
      </form>
    </div>
  )
}

export default form;