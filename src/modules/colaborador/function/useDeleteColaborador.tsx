import axios from "axios";

const useDeleteColaborador = () => {
  return (uuid: string) => axios.delete(`${import.meta.env.VITE_API_URL}/satisfacao/colaborador/${uuid}`);
}

export default useDeleteColaborador;
