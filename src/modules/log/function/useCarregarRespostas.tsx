import useSWR from "swr";
import axios from "axios";

const useCarregarRespostas = (data_inicio: string, data_fim: string) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  return useSWR(`${import.meta.env.VITE_API_URL}/satisfacao/resposta/${data_inicio}/${data_fim}`, fetcherGET);
}

export default useCarregarRespostas;
