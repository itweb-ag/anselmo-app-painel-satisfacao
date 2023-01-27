import axios from "axios";

const useDeleteUsuario = () => {
  return (uuid: string) => axios.delete(`${import.meta.env.VITE_API_URL}/satisfacao/usuario/${uuid}`);
}

export default useDeleteUsuario;
