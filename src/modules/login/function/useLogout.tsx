import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import {useLocalStorage} from "usehooks-ts";

const useLogin = () => {
  const {setUser} = useContext(UserContext);
  const [token, setToken] = useLocalStorage('token', '');
  
  return () => {
    setToken('');
    setUser({uuid: '', nome: '', token: ''});
  };
}

export default useLogin;