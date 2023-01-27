import useSWR from "swr";
import axios from "axios";

const useCarregarRelatorioData = (data: string) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  let key;
  if (data !== '') {
    key = `${import.meta.env.VITE_API_URL}/satisfacao/relatorio/${data}`;
  } else {
    key = `${import.meta.env.VITE_API_URL}/satisfacao/relatorio`;
  }
  
  return useSWR(key, fetcherGET);
}

export default useCarregarRelatorioData;
