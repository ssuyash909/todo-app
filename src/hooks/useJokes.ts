import  { useState, useEffect } from "react";

import axios from "axios";

import type { Joke } from "@/types/joke";

export const useJokes  = () =>{
    const [joke,setJoke] = useState<Joke | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    useEffect(() =>{
        (async() =>{
            setIsLoading(true);
            try{
            const {data} = await axios.get<Joke []>('https://official-joke-api.appspot.com/jokes/programming/random');
            setJoke(data[0]);
            }catch(err){
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        })()
    },[])
    // useEffect(() =>{
    //     setIsLoading(true);    
    //     axios.get<Joke[]>('https://official-joke-api.appspot.com/jokes/programming/random')
    //     .then(res =>{
    //     setJoke(res.data[0]);
    //     })
    //     .finally(() =>{
    //         setIsLoading(false); 
    //     })
    // },[])

    return {joke , isLoading}
}