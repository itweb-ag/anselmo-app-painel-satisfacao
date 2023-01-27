import axios from "axios";

const useDeletarResposta = () => {
  return (id: number) => axios.delete(`${import.meta.env.VITE_API_URL}/satisfacao/resposta/${id}`);
}

export default useDeletarResposta;
