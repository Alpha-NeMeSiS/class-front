export const apiFetch =  async(url: string, option: RequestInit = {}) =>{
    try
    {
        const reponse = await fetch(url, option);
        if(!reponse.ok)
        {
            throw new Error(`HTTP error! Status: ${reponse.status}`);
        }
        return await reponse.json();
    }catch(error:any){
        return error.message;
    }
    
}