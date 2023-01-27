import {Paper, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router";

const SubMenu = () => {
  const [aba, setAba] = useState(0);
  const navigate = useNavigate();
  
  return (
    <Paper elevation={3}>
      <Tabs value={aba}>
        <Tab label={"Geral"} onClick={() => {
          setAba(0);
          navigate("/relatorio");
        }}/>
        {/*<Tab label={"Colaborador"} onClick={() => {*/}
        {/*  setAba(1);*/}
        {/*  navigate("colaborador");*/}
        {/*}}/>*/}
      </Tabs>
    </Paper>
  );
}

export default SubMenu;