import useSWR from "swr";
import axios from "axios";

const useCarregarColaboradores = (update: boolean) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  return useSWR([`${import.meta.env.VITE_API_URL}/satisfacao/colaborador`, update], fetcherGET);
}

export default useCarregarColaboradores;
