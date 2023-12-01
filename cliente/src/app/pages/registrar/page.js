'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './estilo.css';
import { useState } from "react";
import { postUser } from "@/app/functions/handlerAcessAPI";
import { useRouter } from 'next/navigation';

export default function Register(){
  const [user, setUser] =useState({
    nome:'',
    senha: '',
    confirmaSenha: ''
  });

  const {push} = useRouter();

  const handlerFormSubmit = async (event) => {
    event.preventDefault();


    try{
      await postUser(user);
      return push("/pages/dashboard");
    } catch{
      return toast.error("Erro");
    }
  }


    return (
      <div className="tudo">
          <div>
        <h1>Cadastrar</h1>
        </div>
      
        <form onSubmit={handlerFormSubmit}>
        <input
          placeholder='Nome'
          type="nome"
          onChange={(e) => { setUser({ ...user, nome: e.target.value }) }}>
        </input>
        <input
          placeholder='Senha'
          type="password"
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}>
        </input>
        <input
          placeholder='Confirma'
          type='confirmaSenha'
          onChange={(e) => { setUser({ ...user, confirmaSenha: e.target.value }) }}>
        </input>
          <button>Cadastrar</button>
          <ToastContainer/>
        </form>
      </div>
    )
  }

