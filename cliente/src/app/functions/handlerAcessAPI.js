'use server'


const url = "https://trabalho-final-tau.vercel.app"


const getUserAuthenticated = async (user) => {
    const responseOfApi = await fetch(url +"/user/authenticated",
    {
       cache:"no-cache",
       method:"POST",
       headers:{"Content-Type":"Application/json"},
       body: JSON.stringify(user)
    }
    );
   const userAuth =await responseOfApi.json();
   console.log(userAuth)
   return userAuth;
}

const getUsers = async () =>{
    try{
        const responseOfApi = await fetch(url + "/users",{
            next:{revalidate:10}
        });
        const listUsers = await responseOfApi.json();

        return listUsers
    }catch{
        return null;
    }

    }

    const postUser = async (user) =>{
        try{
            const responseOfApi = await fetch(url + "/user", {
                method: "POST",
                headers: { 'Content-Type': 'Application/json'},
                body: JSON.stringify(user)
            });
            const userSave = await responseOfApi.json();
            return userSave;
        }catch{
           return null;
        }
    }
        

export { getUsers, getUserAuthenticated, postUser };