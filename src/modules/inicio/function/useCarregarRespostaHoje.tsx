import useSWR from "swr";
import axios from "axios";

const useCarregarRespostaHoje = () => {
  const fetcherGET = (url: string) => axios.get(url).then((res) => res.data);
  let date = new Date();
  let ano = `${date.getFullYear()}`;
  let mes = ((date.getMonth() + 1) < 10) ? `${('0' + (date.getMonth() + 1))}` : `${(date.getMonth() + 1)}`;
  let dia = (date.getDate() < 10) ? `${('0' + date.getDate())}` : `${date.getDate()}`;
  return useSWR(`${import.meta.env.VITE_API_URL}/satisfacao/resposta/${ano}-${mes}-${dia}/${ano}-${mes}-${dia}`, fetcherGET, {refreshInterval: 3000});
}

export default useCarregarRespostaHoje;
