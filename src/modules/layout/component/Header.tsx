import {useTheme} from "@mui/material";
import Logo from "../../../assets/img/logo-branca.png";
import {Link} from "react-router-dom";
import useLogout from "../../login/function/useLogout";
import {FaBars} from "react-icons/fa";
import {useRef} from "react";

const Header = () => {
  const theme = useTheme();
  const logout = useLogout();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    let menu = menuRef.current!;
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
    } else {
      menu.classList.add('open');
    }
  }
  
  return (
    <div className={"header"} style={{backgroundColor: theme.palette.primary.main}}>
      <img src={Logo} alt={"Logo Anselmo Auto Skape"} className={"logo"}/>
      <div className={"menu"} ref={menuRef} style={{backgroundColor: theme.palette.primary.main}}>
        <Link to={"/"}>Início</Link>
        <Link to={"/colaborador"}>Colaboradores</Link>
        <Link to={"/relatorio"}>Relatórios</Link>
        <Link to={"/log"}>Logs</Link>
        <Link to={"/usuario"}>Usuários</Link>
        <a style={{cursor:"pointer"}} onClick={() => {
          logout();
        }}>Sair</a>
      </div>
      <div className={"hamburguer"} onClick={toggleMenu}>
        <FaBars size={20}/>
      </div>
      <div className={"user"}>
      
      </div>
    </div>
  )
}

export default Header;