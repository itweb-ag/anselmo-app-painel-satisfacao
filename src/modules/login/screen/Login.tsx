import {useContext, useState} from "react";
import {LoginEntity} from "../entity/LoginEntity";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField, Typography
} from "@mui/material";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import useLogin from "../function/useLogin";
import {UserContext} from "../context/UserContext";
import Logo from "../../../assets/img/Logo.png";
import {useSnackbar} from "notistack";
import {useLocalStorage} from "usehooks-ts";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginEntity>({username: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const {setUser} = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  const [token, setToken] = useLocalStorage('token', '');
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  
  const handleLogin = () => {
    login(loginInfo)
      .then((response) => {
        enqueueSnackbar("Login efetuado!", {variant: "success"});
        setToken(response.data.token);
        setUser(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data, {variant: "error"});
      })
    ;
  }
  
  return (
    <Paper className={"login-screen"}>
      <img src={Logo} alt={"Logo"}/>
      <div className={"form"}>
        <TextField
          label={"Usuário"}
          variant={"outlined"}
          margin={"normal"}
          fullWidth
          color={"primary"}
          value={loginInfo.username}
          onChange={(t) => {
            setLoginInfo({...loginInfo, username: t.target.value})
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
            value={loginInfo.password}
            onChange={(t) => {
              setLoginInfo({...loginInfo, password: t.target.value})
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleLogin();
              }
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
        
        <Button variant={"contained"} size={"large"} onClick={handleLogin} sx={{marginTop: '20px'}}>
          Login
        </Button>
      </div>
    </Paper>
  )
}

export default Login;