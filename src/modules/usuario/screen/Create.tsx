import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField
} from "@mui/material";
import {createRef, useState} from "react";
import {useNavigate} from "react-router";
import useCreateUsuario from "../function/useCreateUsuario";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import {UsuarioCreateEntity} from "../entity/UsuarioCreateEntity";
import {useSnackbar} from "notistack";

export const Create = () => {
  const [usuario, setUsuario] = useState<UsuarioCreateEntity>({
    nome: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const createUsuario = useCreateUsuario();
  const [showPassword, setShowPassword] = useState(false);
 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  
  const handleCreate = () => {
    createUsuario(usuario)
      .then(() => {
        enqueueSnackbar("Usuário criado!", {variant: "success"});
        navigate(-1);
      });
  }
  
  return (
    <div className={"form"}>
      <Paper elevation={3} sx={{padding:"10px"}}>
        <Button variant={"contained"} onClick={handleCreate}>
          Salvar
        </Button>
        <Button sx={{marginLeft: "10px"}} variant={"contained"} color={"info"} onClick={() => {
          navigate(-1);
        }}>
          Cancelar
        </Button>
      </Paper>
      <Paper elevation={3} sx={{marginTop:"20px", padding:"10px"}}>
        <TextField
          variant={"outlined"}
          label={"Nome"}
          fullWidth
          value={usuario.nome}
          onChange={(t) => {
            setUsuario({...usuario, nome: t.target.value})
          }}
        />
        <TextField
          sx={{marginTop:"20px"}}
          variant={"outlined"}
          label={"Username"}
          fullWidth
          value={usuario.username}
          onChange={(t) => {
            setUsuario({...usuario, username: t.target.value})
          }}
        />
        <FormControl
          variant="outlined"
          fullWidth
          margin={"normal"}
        >
          <InputLabel htmlFor="outlined-adornment-password">{"Senha"}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={usuario.password}
            onChange={(t) => {
              setUsuario({...usuario, password: t.target.value})
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash/> : <FaRegEye/>}
                </IconButton>
              </InputAdornment>
            }
            label={"Senha"}
          />
        </FormControl>
      </Paper>
    </div>
  );
}

export default Create;