import useSWR from "swr";
import axios from "axios";

const useCarregarAplicacao = (update: boolean) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  return useSWR([`${import.meta.env.VITE_API_URL}/satisfacao/status`, update], fetcherGET);
}

export default useCarregarAplicacao;
