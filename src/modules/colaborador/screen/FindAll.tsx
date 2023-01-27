import useCarregarColaboradores from "../function/useCarregarColaboradores";
import {
  Backdrop, Button, Chip,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {ColaboradorEntity} from "../entity/ColaboradorEntity";
import useUpdateColaborador from "../function/useUpdateColaborador";
import {useState} from "react";
import {useNavigate} from "react-router";
import useDeleteColaborador from "../function/useDeleteColaborador";
import {useSnackbar} from "notistack";

export const FindAll = () => {
  const [reload, setReload] = useState(true);
  const [deleteItem, setDeleteItem] = useState('');
  const navigate = useNavigate();
  const {data, isValidating} = useCarregarColaboradores(reload);
  const updateColaborador = useUpdateColaborador();
  const deleteColaborador = useDeleteColaborador();
  const {enqueueSnackbar} = useSnackbar();
  
  const update = () => {
    setReload(!reload);
  }
  
  const handleToggleStatus = (uuid: string, status: boolean) => {
    updateColaborador(uuid, {status: !status})
      .then(() => {
        enqueueSnackbar("Status alterado!", {variant: "success"});
        update();
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data, {variant: "error"});
      })
    ;
  }
  
  const handleCloseDelete = () => {
    setDeleteItem('');
  }
  
  const handleDelete = () => {
    if (deleteItem !== '') {
      deleteColaborador(deleteItem)
        .then(() => {
          enqueueSnackbar("Colaborador excluído!", {variant: "error"});
          update();
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data, {variant: "error"});
        })
        .finally(handleCloseDelete)
      ;
    }
  }
  
  return (
    <>
      <Paper elevation={3} sx={{padding: "10px"}}>
        <Button variant={"contained"} onClick={() => {
          navigate("create")
        }}>
          Novo
        </Button>
      </Paper>
      {isValidating ?
        <Backdrop open>
          <CircularProgress/>
        </Backdrop>
        :
        data &&
        <Paper elevation={3} sx={{marginTop: "20px"}}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align={"center"}>
                    Status
                  </TableCell>
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell align={"center"}>
                    Opções
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((colaborador: ColaboradorEntity) => (
                  <TableRow key={colaborador.uuid}>
                    <TableCell sx={{width: "100px"}} align={"center"}>
                      <Chip
                        variant={"outlined"}
                        color={colaborador.status ? "primary" : "error"}
                        label={colaborador.status ? "Ativo" : "Inativo"}
                        onClick={() => {
                          handleToggleStatus(colaborador.uuid, colaborador.status)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {colaborador.nome}
                    </TableCell>
                    <TableCell align={"center"}>
                      <Grid container spacing={1} sx={{maxWidth: "300px", width:"100%", marginLeft:"auto", marginRight:"auto"}}>
                        <Grid item xs={12} sm={12} md={4}>
                          <Button variant={"contained"} fullWidth onClick={() => {
                            navigate(`read/${colaborador.uuid}`);
                          }}>
                            Visualizar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Button color={"secondary"} variant={"contained"} fullWidth onClick={() => {
                            navigate(`update/${colaborador.uuid}`);
                          }}>
                            Editar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <Button color={"error"} fullWidth variant={"contained"} onClick={() => {
                            setDeleteItem(colaborador.uuid);
                          }}>
                            Excluir
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      }
      <Dialog
        open={deleteItem !== ''}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Excluir colaborador?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta ação removerá o registro PERMANENTEMENTE,
            tem certeza que deseja excluir o colaborador?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FindAll;