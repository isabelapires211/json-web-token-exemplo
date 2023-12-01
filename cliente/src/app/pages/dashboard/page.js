import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/componente/ListUsers";
import './estilo.css';

export default async function Dashboard() {
    const users = await getUsers();
  return(
    <div>

<nav className="navbar">
        <a href="/pages/alterar">Alterar</a>
        <a href="/pages/registrar">Registrar</a>
      </nav>
        
        <Suspense fallback={<p className="fallback">carregando...</p>}>
       
        <div className="container">
      
         
            <ListUsers users={users}/>

  
            </div>
        </Suspense>
     
    </div>
  );};