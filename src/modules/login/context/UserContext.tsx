import {createContext, ReactNode, useState} from "react";
import {UsuarioContextEntity} from "../../usuario/entity/UsuarioContextEntity";

type UserContextType = {
  user: UsuarioContextEntity,
  setUser: Function
}
const UserContext = createContext<UserContextType>(null!);

type UserProviderType = {
  children: ReactNode
}

const UserProvider = ({children}: UserProviderType) => {
  const [user, setUser] = useState<UsuarioContextEntity>({uuid:'' ,nome:'', token:''});
  
  const value:UserContextType = {user, setUser};
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export {UserContext, UserProvider};