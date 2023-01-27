import axios from "axios";
import {UsuarioCreateEntity} from "../entity/UsuarioCreateEntity";

const useUpdateColaborador = () => {
  return (usuario: UsuarioCreateEntity) => axios.post(`${import.meta.env.VITE_API_URL}/satisfacao/usuario`, usuario);
}

export default useUpdateColaborador;
