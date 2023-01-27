import axios from "axios";

const useUpdateUsuario = () => {
  return (uuid: string, usuario: any) => axios.post(`${import.meta.env.VITE_API_URL}/satisfacao/usuario/${uuid}`, usuario);
}

export default useUpdateUsuario;
