import {
  Button,
  CircularProgress, Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {useSnackbar} from "notistack";
import useCarregarRespostas from "../function/useCarregarRespostas";
import {useState} from "react";
import useDeletarResposta from "../function/useDeletarResposta";
import SeletorDeData, {dateToString} from "../component/SeletorDeData";

type dataArg = {
  inicio: string,
  fim: string
}
export const FindAll = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [data, setData] = useState<dataArg>({inicio: dateToString(new Date()), fim: dateToString(new Date())});
  const logs = useCarregarRespostas(data.inicio, data.fim);
  const deletarResposta = useDeletarResposta();
  
  return (
    <>
      <Paper elevation={3} className={"card"}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <SeletorDeData label={"Data de início"} value={data.inicio} setData={(d) => {setData({...data, inicio: d})}}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <SeletorDeData label={"Data de fim"} value={data.fim} setData={(d) => {setData({...data, fim: d})}}/>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={3} className={"card"} sx={{marginTop:"20px"}}>
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
    </>
  );
}

export default FindAll;