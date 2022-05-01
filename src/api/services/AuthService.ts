import http from "@/http-common";
import apiClient from "@/http-common";

export interface LoginProps {
    mail:string;
    password:string
}

export interface LoginResponse {
    token:string,
    expiration:string
}

class AuthService{
    async login(userDetails:LoginProps):Promise<LoginResponse | undefined>{
        try {
            const result:LoginResponse = await apiClient.post("/authenticate", userDetails)
            console.log(result)
            return result
        }
        catch (e) {
            console.log(e)
        }

    }

    async logout(userDetails:LoginProps):Promise<LoginResponse | undefined>{
        try {
            const result:LoginResponse = await apiClient.post("/authenticate", userDetails)
            console.log(result)
            return result
        }
        catch (e) {
            console.log(e)
        }

    }
    /*
    getAll(): Promise<any> {
        return http.get("/tutorials");
    }

    get(id: any): Promise<any> {
        return http.get(`/tutorials/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/tutorials", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll(): Promise<any> {
        return http.delete(`/tutorials`);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`/tutorials?title=${title}`);
    }
    /*
     */
}

export default new AuthService();