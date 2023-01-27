import {
  Button,
  CircularProgress,
  FormControl,
  Grid, IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {meses} from "../../../misc/datas";
import {getDaysInMonth} from 'date-fns';
import rangeNumberToArray from "../../../misc/function/rangeNumberToArray";
import LineChart from "../component/LineChart";
import useCarregarColaboradores from "../../colaborador/function/useCarregarColaboradores";
import {ColaboradorEntity} from "../../colaborador/entity/ColaboradorEntity";
import {useNavigate, useParams} from "react-router";
import useCarregarRelatorioColaboradorData from "../function/useCarregarRelatorioColaboradorData";

const RelatorioColaborador = () => {
  const {uuid} = useParams();
  const [ano, setAno] = useState(-1);
  const [mes, setMes] = useState<number>(-1);
  const [dias, setDias] = useState<Array<number>>([]);
  const [grafico, setGrafico] = useState(true);
  const navigate = useNavigate();
  
  const relatorioColaborador = useCarregarRelatorioColaboradorData(`${uuid}`, ano !== -1 ? (mes !== -1 ? `${ano}-${mes}` : `${ano}`) : '');
  const colaboradores = useCarregarColaboradores(true);
  
  useEffect(() => {
    if (ano === -1) {
      setMes(-1);
    }
  }, [ano]);
  
  useEffect(() => {
    if (mes !== -1) {
      setDias(rangeNumberToArray(1, getDaysInMonth(new Date(ano, mes))));
    }
  }, [mes]);
  
  const handleChangeMes = (event: SelectChangeEvent<number>) => {
    setMes(parseInt(`${event.target.value}`));
  };
  
  return (
    <>
      <Paper elevation={3} sx={{padding: "10px", marginTop: "10px"}}>
        {!relatorioColaborador.data && relatorioColaborador.isValidating ?
          <CircularProgress/>
          :
          relatorioColaborador.data &&
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="ano-select-label">Colaborador</InputLabel>
                <Select
                  labelId="colaborador-select-label"
                  id="colaborador-select"
                  value={uuid}
                  label="Colaborador"
                  onChange={(t) => {
                    navigate(`/relatorio/${t.target.value}`);
                  }}
                >
                  {colaboradores.data.map((item: ColaboradorEntity) => (
                    <MenuItem key={item.uuid} value={item.uuid}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="ano-select-label">Ano</InputLabel>
                <Select
                  labelId="ano-select-label"
                  id="ano-select"
                  value={`${ano}`}
                  label="Ano"
                  onChange={(t) => {
                    setAno(parseInt(t.target.value));
                  }}
                >
                  <MenuItem value={-1}>Todos</MenuItem>
                  {relatorioColaborador.data.lista_anos.map((item: number) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth disabled={ano === -1}>
                <InputLabel id="mes-select-label">Mês</InputLabel>
                <Select
                  labelId="mes-select-label"
                  id="mes-select"
                  value={mes}
                  label="Mês"
                  onChange={handleChangeMes}
                >
                  <MenuItem value={-1}>Todos</MenuItem>
                  {meses.map((item, index) => (
                    <MenuItem key={index} value={index}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
      </Paper>
      <Paper elevation={3} sx={{padding: "10px", marginTop: "10px"}}>
        {!relatorioColaborador.data && relatorioColaborador.isValidating ?
          <CircularProgress/>
          :
          relatorioColaborador.data &&
          <>
            <div style={{display: "flex", alignItems: "center"}}>
              <Typography fontSize={24} fontFamily={"Bebas Neue"}>{grafico ? "Gráfico" : "Tabela"}</Typography>
              <Button
                variant={"contained"}
                onClick={() => {
                  setGrafico(!grafico);
                }}
                sx={{marginLeft: "10px"}}
              >
                {grafico ? "Mostrar tabela" : "Mostrar gráfico"}
              </Button>
            </div>
            {grafico ?
              (ano === -1 ?
                  <LineChart
                    labels={relatorioColaborador.data.lista_anos}
                    dados={[{
                      label: relatorioColaborador.data.colaborador.nome,
                      data: relatorioColaborador.data.anos.map((item: any) => item.quantidade > 0 ? (item.total / item.quantidade).toFixed(2) : 0),
                      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                      tension: 0.5
                    }]}
                  />
                  :
                  (mes === -1 ?
                      <LineChart
                        labels={meses}
                        dados={[{
                          label: relatorioColaborador.data.colaborador.nome,
                          data: relatorioColaborador.data.meses.map((item: any) => item.quantidade > 0 ? (item.total / item.quantidade).toFixed(2) : 0),
                          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                          tension: 0.5
                        }]}
                      />
                      :
                      <LineChart
                        labels={dias}
                        dados={
                          [{
                            label: relatorioColaborador.data.colaborador.nome,
                            data: relatorioColaborador.data.dias.map((item: any) => item.quantidade > 0 ? (item.total / item.quantidade).toFixed(2) : 0),
                            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                            tension: 0.5
                          }]
                        }/>
                  )
              )
              :
              (ano === -1 ?
                  <TableContainer>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Colaborador
                          </TableCell>
                          {relatorioColaborador.data.lista_anos.map((item: number) => (
                            <TableCell key={item}>
                              {item}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {relatorioColaborador.data.colaborador.nome}
                          </TableCell>
                          {relatorioColaborador.data.anos.map((item: any, index: number) => (
                            <TableCell key={index}>
                              Pontuação total: {item.total}<br/>
                              Respostas: {item.quantidade}<br/>
                              Média: {item.total > 0 ? (item.total / item.quantidade).toFixed(2) : 0}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  :
                  (mes === -1 ?
                      <TableContainer>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Colaborador
                              </TableCell>
                              {meses.map((item) => (
                                <TableCell key={item}>
                                  {item}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                {relatorioColaborador.data.colaborador.nome}
                              </TableCell>
                              {relatorioColaborador.data.meses.map((itemMes: any, index: number) => (
                                <TableCell key={index}>
                                  Pontuação total: {itemMes.total}<br/>
                                  Respostas: {itemMes.quantidade}<br/>
                                  Média: {itemMes.total > 0 ? (itemMes.total / itemMes.quantidade).toFixed(2) : 0}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      :
                      <TableContainer>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Colaborador
                              </TableCell>
                              {dias.map((item) => (
                                <TableCell align={"center"} key={item}>
                                  Dia {item}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                {relatorioColaborador.data.colaborador.nome}
                              </TableCell>
                              {relatorioColaborador.data.dias.map((item: any) => (
                                <TableCell>
                                  Pontuação total: {item.total}<br/>
                                  Respostas: {item.quantidade}<br/>
                                  Média: {item.total > 0 ? (item.total / item.quantidade).toFixed(2) : 0}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                  )
              )
            }
          </>
        }
      </Paper>
    </>
  );
}

export default RelatorioColaborador;