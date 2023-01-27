import useSWR from "swr";
import axios from "axios";

const useCarregarRelatorioColaboradorData = (uuid: string, data: string) => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  
  let key;
  if (uuid !== '') {
    if (data !== '') {
      key = `${import.meta.env.VITE_API_URL}/satisfacao/relatorio/colaborador/${uuid}/${data}`;
    } else {
      key = `${import.meta.env.VITE_API_URL}/satisfacao/relatorio/colaborador/${uuid}`;
    }
  } else {
    key = null;
  }
  
  
  return useSWR(key, fetcherGET);
}

export default useCarregarRelatorioColaboradorData;
