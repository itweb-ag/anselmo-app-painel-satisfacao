import axios from "axios";
import {LoginEntity} from "../entity/LoginEntity";

const useLogin = () => {
  return (loginInfo: LoginEntity) => axios.post(`${import.meta.env.VITE_API_URL}/satisfacao/login`, loginInfo);
}

export default useLogin;