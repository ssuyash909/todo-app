import  { useState, useEffect } from "react";

import jokeService from "@/service/jokes";

import type { Joke } from "@/types/joke";

export const useJokes  = () =>{
    const [joke,setJoke] = useState<Joke | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    useEffect(() =>{
        if(joke === null){
        (async() =>{
            setIsLoading(true);
            try{
            const joke = await jokeService.getJoke();
            setJoke(joke);
            }catch(err){
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        })()
        }
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