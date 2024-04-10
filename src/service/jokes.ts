import axios, {Axios} from "axios";
import type { Joke } from "@/types/joke";

export class JokeService{
    private apiInstance : Axios;

    constructor(){
        this.apiInstance = axios.create({
            baseURL : 'https://official-joke-api.appspot.com/jokes/programming/random',
            responseType : "json"
        })
    }

    public async getJoke() : Promise<Joke>{
        const {data} = await this.apiInstance.get<Joke []>('');
        return data[0];
    }
}

export default new JokeService();