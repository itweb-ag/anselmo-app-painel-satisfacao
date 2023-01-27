import {Backdrop, Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import useCarregarColaborador from "../function/useCarregarColaborador";

export const Find = () => {
  const {uuid} = useParams();
  const {data, isValidating} = useCarregarColaborador(`${uuid}`);
  const navigate = useNavigate();
  
  return (
    <>
      {!data && isValidating ?
        <Backdrop open>
          <CircularProgress/>
        </Backdrop>
        :
        data &&
        <div className={"form"}>
          <Paper elevation={3} sx={{padding:"10px"}}>
            <Button variant={"contained"} onClick={() => {navigate(`/colaborador/update/${uuid}`)}} color={"secondary"}>
              Editar
            </Button>
            <Button variant={"contained"} sx={{marginLeft:"10px"}} onClick={() => {navigate(-1)}} color={"info"}>
              Voltar
            </Button>
          </Paper>
          <Paper elevation={3} sx={{padding:"10px", marginTop:"20px",}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <img
                  src={import.meta.env.VITE_API_URL + data.foto}
                  alt={data.nome}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography fontSize={20} fontFamily={"Bebas Neue"}>
                  {data.nome}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      }
    </>
  );
}

export default Find;