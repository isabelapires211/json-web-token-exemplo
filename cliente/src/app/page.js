'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './page.css';

export default function Login() {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });
  const { push,refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if (userAuth.token === undefined) {
        toast.error("Verifique se senha ou E-mail são válidos!");
      } else {
        push('/pages/dashboard');
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      refresh();
    }
  };
  return (
    <div className="tudo">
    <div className="div">
      <h1>Login</h1>
      <form onSubmit={handlerLogin}>
        <input
          placeholder='name'
          type="name"
          onChange={(e) => { setUser({ ...user, name: e.target.value }) }}>
        </input>
        <input
          placeholder='Senha'
          type='password'
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
        </input>
        <button>Entrar</button>
        <ToastContainer/>
      </form>
    </div>
    </div>
  )
}
