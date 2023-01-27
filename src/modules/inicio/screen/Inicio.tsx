import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography,
} from "@mui/material";
import useCarregarAplicacao from "../function/useCarregarAplicacao";
import {useState} from "react";
import useToggleAplicacao from "../function/useToggleAplicacao";
import {useSnackbar} from "notistack";
import useCarregarRespostaHoje from "../function/useCarregarRespostaHoje";
import useDeletarResposta from "../../log/function/useDeletarResposta";

const Inicio = () => {
  const [reload, setReload] = useState(false);
  const statusAplicacao = useCarregarAplicacao(reload);
  const logs = useCarregarRespostaHoje();
  const toggleAplicacao = useToggleAplicacao();
  const {enqueueSnackbar} = useSnackbar();
  const deletarResposta = useDeletarResposta();
  
  const toggleStatusAplicacao = () => {
    toggleAplicacao()
      .then(() => {
        enqueueSnackbar("Status alterado!", {variant: "success"});
        setReload(!reload);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data, {variant: "error"});
      })
    ;
  }
  
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper elevation={3} className={"card"}>
          <Typography fontSize={30} fontFamily={"Bebas Neue"} sx={{marginBottom: "20px"}}>
            Status da aplicação
          </Typography>
          {!statusAplicacao.data && statusAplicacao.isValidating ?
            <CircularProgress size={50}/>
            :
            (statusAplicacao.data &&
              <Button
                variant={"outlined"}
                color={statusAplicacao.data.status ? "primary" : "error"}
                sx={{borderRadius: "50%", width: "100px", height: "100px"}}
                onClick={toggleStatusAplicacao}
              >
                {statusAplicacao.data.status ? "Ativo" : "Desativado"}
              </Button>
            )
          }
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6} lg={8}>
        <Paper elevation={3} className={"card"}>
          <Typography fontSize={30} fontFamily={"Bebas Neue"}>
            Logs
          </Typography>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Data/Hora
                  </TableCell>
                  <TableCell>
                    Colaborador
                  </TableCell>
                  <TableCell align={"center"}>
                    Opções
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!logs.data && logs.isValidating) ?
                  <TableRow>
                    <TableCell>
                      <CircularProgress/>
                    </TableCell>
                  </TableRow>
                  :
                  logs.data && logs.data.map((log: any) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {log.criado}
                      </TableCell>
                      <TableCell>
                        {log.colaborador}
                      </TableCell>
                      <TableCell align={"center"}>
                        <Button
                          color={"error"}
                          variant={"contained"}
                          onClick={() => {
                            deletarResposta(log.id)
                              .then(() => {
                                enqueueSnackbar("Removido!", {variant: "success"});
                              })
                              .catch((error) => {
                                enqueueSnackbar(error.response.data, {variant: "error"});
                              })
                          }}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Inicio;