import useCarregarUsuario from "../function/useCarregarUsuarios";
import {
  Backdrop, Button, Chip,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import useUpdateUsuario from "../function/useUpdateUsuario";
import {useState} from "react";
import {useNavigate} from "react-router";
import useDeleteUsuario from "../function/useDeleteUsuario";
import {UsuarioEntity} from "../entity/UsuarioEntity";
import {useSnackbar} from "notistack";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const FindAll = () => {
  const [reload, setReload] = useState(true);
  const [deleteItem, setDeleteItem] = useState('');
  const navigate = useNavigate();
  const {data, isValidating} = useCarregarUsuario(reload);
  const updateUsuario = useUpdateUsuario();
  const deleteUsuario = useDeleteUsuario();
  const {enqueueSnackbar} = useSnackbar();
  
  const update = () => {
    setReload(!reload);
  }
  
  const handleToggleStatus = (uuid: string | undefined, status: boolean) => {
    if (uuid != null) {
      updateUsuario(uuid, {status: !status})
        .then(() => {
          enqueueSnackbar("Status alterado!", {variant: "success"});
          update();
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data, {variant: "error"});
        })
      ;
    }
  }
  
  const handleCloseDelete = () => {
    setDeleteItem('');
  }
  
  const handleDelete = () => {
    if (deleteItem !== '') {
      deleteUsuario(deleteItem)
        .then(() => {
          enqueueSnackbar("Usuário excluído!", {variant: "error"});
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
      <Paper elevation={3} sx={{padding:"10px"}}>
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
        <Paper elevation={3} sx={{marginTop:"20px"}}>
          <TableContainer>
            <Table sx={{minWidth: 750}}>
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
                {data.map((usuario: UsuarioEntity) => (
                  <TableRow key={usuario.uuid}>
                    <TableCell sx={{width: "100px"}} align={"center"}>
                      <Chip
                        variant={"outlined"}
                        color={usuario.status ? "primary" : "error"}
                        label={usuario.status ? "Ativo" : "Inativo"}
                        onClick={() => {
                          handleToggleStatus(usuario.uuid, usuario.status)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {usuario.nome}
                    </TableCell>
                    <TableCell align={"center"}>
                      <Button color={"secondary"} variant={"contained"} sx={{marginLeft:"10px"}} onClick={() => {
                        navigate(`update/${usuario.uuid}`);
                      }}>
                        Editar
                      </Button>
                      <Button color={"error"} sx={{marginLeft:"10px"}} variant={"contained"} onClick={() => {
                        setDeleteItem(`${usuario.uuid}`);
                      }}>
                        Excluir
                      </Button>
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
          {"Excluir usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta ação removerá o registro PERMANENTEMENTE,
            tem certeza que deseja excluir o usuario?
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