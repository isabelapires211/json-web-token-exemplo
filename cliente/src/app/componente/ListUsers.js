import './estilo.css'
export default async function ListUsers({users}) {
    await new Promise((resolve) => setTimeout(resolve,5000));
   
    return(
        <div>
       
         {users?.map ((user, index )=>
          <div className='card'> 
           <p key={index}>{user.nome} </p>
           </div>
       ) }
        
        </div>
    );
}