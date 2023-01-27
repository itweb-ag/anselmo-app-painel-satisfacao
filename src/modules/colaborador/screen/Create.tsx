import {Button, Paper, TextField, Typography, useTheme} from "@mui/material";
import {createRef, useState} from "react";
import SemImagem from "../../../assets/img/no-pic.jpg";
import {useNavigate} from "react-router";
import useCreateColaborador from "../function/useCreateColaborador";
import {useSnackbar} from "notistack";

type ColaboradorCreateType = {
  nome: string,
  foto: File | null,
  fotoUrl: string
}

export const Create = () => {
  const [colaborador, setColaborador] = useState<ColaboradorCreateType>({
    nome: '',
    foto: null,
    fotoUrl: ''
  });
  const inputImgRef = createRef<HTMLInputElement>();
  const navigate = useNavigate();
  const createColaborador = useCreateColaborador();
  const {enqueueSnackbar} = useSnackbar();
  
  const changeImage = (event: any) => {
    setColaborador({
      ...colaborador,
      fotoUrl: URL.createObjectURL(event.target.files[0]),
      foto: event.target.files[0]});
  }
  
  const handleCreate = () => {
    let formData = new FormData();
    formData.append('nome', colaborador.nome);
  
    if (colaborador.foto) {
      formData.append('foto', colaborador.foto);
    }
  
    createColaborador(formData)
      .then(() => {
        enqueueSnackbar("Colaborador adicionado!", {variant: "success"});
        navigate(-1);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data, {variant: "error"});
      })
    ;
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
        <div style={{display:"flex", alignItems:"center"}}>
          <img
            src={colaborador.fotoUrl !== '' ? colaborador.fotoUrl : SemImagem}
            alt={colaborador.nome !== '' ? colaborador.nome : "Sem imagem"}
          />
          <Button sx={{marginLeft:"10px"}} variant={"contained"} onClick={() => {
            inputImgRef.current?.click()
          }}>
            Selecionar imagem
          </Button>
          <input
            className={"input-img"}
            onChange={(e) => {
              changeImage(e);
            }}
            style={{display:"none"}}
            ref={inputImgRef}
            type={"file"}
            accept={"image/jpeg,image/png"}
          />
        </div>
  
        <TextField
          sx={{marginTop:"20px"}}
          variant={"outlined"}
          label={"Nome"}
          fullWidth
          value={colaborador.nome}
          onChange={(t) => {
            setColaborador({...colaborador, nome: t.target.value})
          }}
        />
      </Paper>
    </div>
  );
}

export default Create;