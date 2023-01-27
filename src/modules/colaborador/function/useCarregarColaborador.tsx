import useSWR from "swr";
import axios from "axios";

const useCarregarColaborador = (uuid: string) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  let key;
  if (uuid !== '') {
    key = `${import.meta.env.VITE_API_URL}/satisfacao/colaborador/${uuid}`;
  } else {
    key = null;
  }
  
  return useSWR(key, fetcherGET);
}

export default useCarregarColaborador;
