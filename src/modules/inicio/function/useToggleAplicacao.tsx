import axios from "axios";

const useToggleAplicacao = () => {
  return () => axios.post(`${import.meta.env.VITE_API_URL}/satisfacao/status`);
}

export default useToggleAplicacao;
