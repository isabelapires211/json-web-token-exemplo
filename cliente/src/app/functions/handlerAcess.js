import Cookies from "js-cookie";
import { validateToken } from "./validateToken";
import { getUserAuthenticated } from "./handlerAcessAPI";

const handlerAcessUser = async (user) => {

    const userAuth = await getUserAuthenticated(user);
    
    const isTokenValidate = await validateToken(userAuth.token);

    //console.log(isTokenValidate)

    if (isTokenValidate) {
        Cookies.set('token', userAuth.token, { expires: 1 });
        if( typeof window !== 'undefined'){
        localStorage.setItem('nome', userAuth.nome)
    } } 
    return  userAuth;
}
export default handlerAcessUser;

