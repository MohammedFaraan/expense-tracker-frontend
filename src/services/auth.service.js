import axios from "axios"

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"
class Authentication {

    login(request) {
        return axios.post(BASE_API_URL + "/auth/login", request, {headers: { "Content-Type": "application/x-www-form-urlencoded" }});
    }

    signup(request) {
        return axios.post(BASE_API_URL + "/auth/signup", request, {headers: { "Content-Type": "application/json" }});
    }  
}

const authentication = new Authentication();

export default authentication;