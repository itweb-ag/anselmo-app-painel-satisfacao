import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl, IconButton, InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField
} from "@mui/material";
import {createRef, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import useCarregarUsuario from "../function/useCarregarUsuario";
import useUpdateUsuario from "../function/useUpdateUsuario";
import {UsuarioCreateEntity} from "../entity/UsuarioCreateEntity";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import {useSnackbar} from "notistack";


export const Update = () => {
  const [usuario, setUsuario] = useState<UsuarioCreateEntity>({
    nome: '',
    username: '',
    password: ''
  });
  const {uuid} = useParams();
  const navigate = useNavigate();
  const {data, isValidating} = useCarregarUsuario(`${uuid}`);
  const [carregado, setCarregado] = useState(false);
  const updateUsuario = useUpdateUsuario();
  const [showPassword, setShowPassword] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  
  useEffect(() => {
    if (data && usuario.nome === '' && !carregado && !isValidating) {
      setUsuario({
        ...usuario,
        nome: data.nome,
        username: data.username
      });
      setCarregado(true);
    }
  });
  
  const handleUpdate = () => {
    updateUsuario(`${uuid}`, usuario)
      .then(() => {
        enqueueSnackbar("Usuário alterado!", {variant: "success"});
        navigate(-1);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data, {variant: "error"});
      })
    ;
  }
  
  return (
    <>
      {usuario.nome !== '' ?
        <div className={"form"}>
          <Paper elevation={3} sx={{padding:"10px"}}>
            <Button variant={"contained"} onClick={handleUpdate}>
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
      :
        <Backdrop open>
          <CircularProgress/>
        </Backdrop>
      }
    </>
    
  );
}

export default Update;