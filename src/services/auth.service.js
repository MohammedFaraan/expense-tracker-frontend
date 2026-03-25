import axios from "axios"

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

class AuthenticationService {

    login(request) {
        return axios.post(BASE_API_URL + "/auth/login", request);
    }  
}