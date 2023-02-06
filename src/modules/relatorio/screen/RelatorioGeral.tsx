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
import {createRef, useEffect, useRef, useState} from "react";
import {meses} from "../../../misc/datas";
import {getDaysInMonth} from 'date-fns';
import rangeNumberToArray from "../../../misc/function/rangeNumberToArray";
import useCarregarRelatorioData from "../function/useCarregarRelatorioData";
import BarChart from "../component/BarChart";
import useCarregarColaboradores from "../../colaborador/function/useCarregarColaboradores";
import {ColaboradorEntity} from "../../colaborador/entity/ColaboradorEntity";
import {useNavigate} from "react-router";
import ReactToPrint, {PrintContextConsumer} from 'react-to-print';
import {FaPrint} from "react-icons/all";

const RelatorioGeral = () => {
  const [ano, setAno] = useState(-1);
  const [mes, setMes] = useState<number>(-1);
  const [dia, setDia] = useState(-1);
  const [dias, setDias] = useState<Array<number>>([]);
  const [grafico, setGrafico] = useState(true);
  const navigate = useNavigate();
  const [tableRef, setTableRef] = useState<HTMLDivElement | null>(null);
  
  const relatorioGeral = useCarregarRelatorioData(ano !== -1 ? (mes !== -1 ? (dia !== -1 ? `${ano}-${mes}-${dia}` : `${ano}-${mes}`) : `${ano}`) : '');
  const colaboradores = useCarregarColaboradores(true);
  
  useEffect(() => {
    if (ano === -1) {
      setMes(-1);
      setDia(-1);
    }
  }, [ano]);
  
  useEffect(() => {
    if (mes === -1) {
      setDia(-1);
    } else {
      setDias(rangeNumberToArray(1, getDaysInMonth(new Date(ano, mes))));
    }
  }, [mes]);
  
  const handleChangeMes = (event: SelectChangeEvent<number>) => {
    setMes(parseInt(`${event.target.value}`));
  };
  
  return (
    <>
      <Paper elevation={3} sx={{padding: "10px", marginTop: "10px"}}>
        <Grid container spacing={1}>
          {!colaboradores.data && colaboradores.isValidating ?
            <CircularProgress/>
            :
            colaboradores.data &&
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="ano-select-label">Colaborador</InputLabel>
                <Select
                  labelId="colaborador-select-label"
                  id="colaborador-select"
                  value={''}
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
          }
          
          {!relatorioGeral.data && relatorioGeral.isValidating ?
            <CircularProgress/>
            :
            relatorioGeral.data &&
            <Grid item xs={12} md={3}>
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
                  {relatorioGeral.data.lista_anos.map((item: number) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          }
          
          <Grid item xs={12} md={3}>
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
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth disabled={mes === -1}>
              <InputLabel id="dia-select-label">Dia</InputLabel>
              <Select
                labelId="dia-select-label"
                id="dia-select"
                value={dia}
                label="Dia"
                onChange={(t) => {
                  setDia(parseInt(`${t.target.value}`));
                }}
              >
                <MenuItem value={-1}>Todos</MenuItem>
                {dias.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{padding: "10px", marginTop: "10px"}}>
        {!relatorioGeral.data && relatorioGeral.isValidating ?
          <CircularProgress/>
          :
          relatorioGeral.data &&
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
              {!grafico ?
                <ReactToPrint content={() => tableRef}>
                  <PrintContextConsumer>
                    {({handlePrint}) => (
                      <Tooltip title={"Imprimir"} sx={{ml: "5px"}}>
                        <IconButton onClick={handlePrint}>
                          <FaPrint/>
                        </IconButton>
                      </Tooltip>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
                : null}
            </div>
            {grafico ?
              (ano === -1 ?
                  <BarChart labels={relatorioGeral.data.itens.map((item: any) => item.colaborador.nome)} dados={
                    relatorioGeral.data.lista_anos.map((item: number, index: number) => (
                      {
                        label: item,
                        data: relatorioGeral.data.itens.map((itemAno: any) => itemAno.anos[index].quantidade > 0 ? (itemAno.anos[index].total / itemAno.anos[index].quantidade).toFixed(2) : 0),
                        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                      }
                    ))
                  }/>
                  :
                  (mes === -1 ?
                      <BarChart
                        meses={ano === (new Date()).getFullYear()}
                        labels={relatorioGeral.data.itens.map((item: any) => item.colaborador.nome)}
                        opcoes={{
                          responsive: true,
                          plugins: {
                            legend: {
                              display: true,
                            }
                          }
                        }}
                        dados={meses.map((item, index) => (
                          {
                            label: item,
                            data: relatorioGeral.data.itens.map((itemMes: any) => itemMes.meses[index].quantidade > 0 ? (itemMes.meses[index].total / itemMes.meses[index].quantidade).toFixed(2) : 0),
                            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                          }
                        ))
                        }
                      />
                      :
                      (dia === -1 ?
                          <BarChart labels={relatorioGeral.data.itens.map((item: any) => item.colaborador.nome)} dados={
                            [{
                              label: `${meses[mes]}`,
                              data: relatorioGeral.data.itens.map((item: any) => item.quantidade > 0 ? (item.total / item.quantidade).toFixed(2) : 0),
                              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                            }]
                          }/>
                          :
                          <BarChart labels={relatorioGeral.data.itens.map((item: any) => item.colaborador.nome)} dados={
                            [{
                              label: `Dia ${dia}`,
                              data: relatorioGeral.data.itens.map((itemDia: any) => itemDia.quantidade > 0 ? (itemDia.total / itemDia.quantidade).toFixed(2) : 0),
                              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                            }]
                          }/>
                      )
                  )
              )
              :
              (ano === -1 ?
                  <TableContainer ref={(el) => setTableRef(el)}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Colaborador
                          </TableCell>
                          {relatorioGeral.data.lista_anos.map((item: number) => (
                            <TableCell key={item}>
                              {item}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {relatorioGeral.data.itens.map((item: any) => (
                          <TableRow key={item.colaborador.uuid}>
                            <TableCell>
                              {item.colaborador.nome}
                            </TableCell>
                            {item.anos.map((itemAno: any, index: number) => (
                              <TableCell key={index}>
                                Pontuação total: {itemAno.total}<br/>
                                Respostas: {itemAno.quantidade}<br/>
                                Ótimo: {itemAno.otimo}<br/>
                                Regular: {itemAno.regular}<br/>
                                Ruim: {itemAno.ruim}<br/>
                                Média: {itemAno.total > 0 ? (itemAno.total / itemAno.quantidade).toFixed(2) : 0}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  :
                  (mes === -1 ?
                      <TableContainer ref={(el) => setTableRef(el)}>
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
                            {relatorioGeral.data.itens.map((item: any) => (
                              <TableRow key={item.colaborador.uuid}>
                                <TableCell>
                                  {item.colaborador.nome}
                                </TableCell>
                                {item.meses.map((itemMes: any, index: number) => (
                                  <TableCell key={index}>
                                    Pontuação total: {itemMes.total}<br/>
                                    Respostas: {itemMes.quantidade}<br/>
                                    Ótimo: {itemMes.otimo}<br/>
                                    Regular: {itemMes.regular}<br/>
                                    Ruim: {itemMes.ruim}<br/>
                                    Média: {itemMes.total > 0 ? (itemMes.total / itemMes.quantidade).toFixed(2) : 0}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      :
                      (dia === -1 ?
                          <TableContainer ref={(el) => setTableRef(el)}>
                            <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    Colaborador
                                  </TableCell>
                                  <TableCell>
                                    {meses[mes]}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {relatorioGeral.data.itens.map((item: any) => (
                                  <TableRow key={item.colaborador.uuid}>
                                    <TableCell>
                                      {item.colaborador.nome}
                                    </TableCell>
                                    <TableCell>
                                      Pontuação total: {item.total}<br/>
                                      Respostas: {item.quantidade}<br/>
                                      Ótimo: {item.otimo}<br/>
                                      Regular: {item.regular}<br/>
                                      Ruim: {item.ruim}<br/>
                                      Média: {item.total > 0 ? (item.total / item.quantidade).toFixed(2) : 0}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          :
                          <TableContainer ref={(el) => setTableRef(el)}>
                            <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    Colaborador
                                  </TableCell>
                                  <TableCell>
                                    Dia {dia}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {relatorioGeral.data.itens.map((item: any) => (
                                  <TableRow key={item.colaborador.uuid}>
                                    <TableCell>
                                      {item.colaborador.nome}
                                    </TableCell>
                                    <TableCell>
                                      Pontuação total: {item.total}<br/>
                                      Respostas: {item.quantidade}<br/>
                                      Ótimo: {item.otimo}<br/>
                                      Regular: {item.regular}<br/>
                                      Ruim: {item.ruim}<br/>
                                      Média: {item.total > 0 ? (item.total / item.quantidade).toFixed(2) : 0}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                      )
                  )
              )
            }
          </>
        }
      </Paper>
    </>
  );
}

export default RelatorioGeral;