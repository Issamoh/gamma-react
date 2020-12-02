// authentification service
/*
login(): POST {username, password} & save JWT to Local Storage
logout(): remove JWT from Local Storage
register(): POST {username, email, password}*/
import axios from "axios"

const API_URL = "http://localhost:8080/"

class AuthService{
 login(username,password){
     return axios
            .post(API_URL+ "login",{username,password})
            .then((response) => {
                if(response.data.jwt){
                localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
 }

 logout(){
     localStorage.removeItem("user");
 }

 register(username,email,password){
     return axios.post(API_URL+"admin/adduser",{
         username,
         email,
         password,
     });
 }

}
export default new AuthService();