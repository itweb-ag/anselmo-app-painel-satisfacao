import {ReactNode, useContext} from "react";
import {UserContext} from "../../context/UserContext";
import Login from "../../screen/Login";
import {useLocalStorage} from "usehooks-ts";
import useDecode from "../../function/useDecode";
import {CircularProgress} from "@mui/material";

type Argumentos = {
  children: ReactNode
}

const AuthValidator = ({children}: Argumentos) => {
  const {user, setUser} = useContext(UserContext);
  const [token, setToken] = useLocalStorage<string>('token', '');
  const decode = useDecode();
  
  if (user.uuid !== '') {
    return (<>{children}</>);
  } else {
    if (token) {
      decode(token)
        .then((response) => {
          setUser({uuid: response.data.uuid, nome: response.data.nome, token: token});
        })
        .catch(() => {
          setToken('');
          return (
            <Login/>
          );
        })
      ;
    } else {
      return (
        <Login/>
      )
    }
    return (<CircularProgress/>);
  }
}

export default AuthValidator;