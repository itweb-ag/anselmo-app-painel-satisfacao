import useSWR from "swr";
import axios from "axios";

const useCarregarUsuario = (update: boolean) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  return useSWR([`${import.meta.env.VITE_API_URL}/satisfacao/usuario`, update], fetcherGET);
}

export default useCarregarUsuario;
