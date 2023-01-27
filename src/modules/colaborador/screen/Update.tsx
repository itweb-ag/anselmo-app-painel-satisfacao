import {Backdrop, Button, CircularProgress, Paper, TextField, Typography, useTheme} from "@mui/material";
import {createRef, useEffect, useState} from "react";
import SemImagem from "../../../assets/img/no-pic.jpg";
import {useNavigate, useParams} from "react-router";
import useCarregarColaborador from "../function/useCarregarColaborador";
import useUpdateColaborador from "../function/useUpdateColaborador";
import {useSnackbar} from "notistack";

type ColaboradorUpdateType = {
  nome: string,
  foto: File | null,
  fotoUrl: string
}

export const Update = () => {
  const [colaborador, setColaborador] = useState<ColaboradorUpdateType>({
    nome: '',
    foto: null,
    fotoUrl: ''
  });
  const {uuid} = useParams();
  const navigate = useNavigate();
  const {data, isValidating} = useCarregarColaborador(`${uuid}`);
  const [carregado, setCarregado] = useState(false);
  const updateColaborador = useUpdateColaborador();
  const inputImgRef = createRef<HTMLInputElement>();
  const {enqueueSnackbar} = useSnackbar();
  
  useEffect(() => {
    if (data && colaborador.nome === '' && !carregado && !isValidating) {
      setColaborador({
        ...colaborador,
        nome: data.nome,
        fotoUrl: import.meta.env.VITE_API_URL + data.foto
      });
      setCarregado(true);
    }
  });
  
  const changeImage = (event: any) => {
    setColaborador({
      ...colaborador,
      fotoUrl: URL.createObjectURL(event.target.files[0]),
      foto: event.target.files[0]});
  }
  
  const handleUpdate = () => {
    let formData = new FormData();
    formData.append('nome', colaborador.nome);
    
    if (colaborador.foto) {
      formData.append('foto', colaborador.foto);
    }
    
    updateColaborador(`${uuid}`, formData)
      .then(() => {
        enqueueSnackbar("Colaborador alterado!", {variant: "success"});
        navigate(-1);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data, {variant: "error"});
      })
    ;
  }
  
  return (
    <>
      {colaborador.nome !== '' ?
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
            <div style={{display:"flex", alignItems:"center"}}>
              <img
                src={colaborador.fotoUrl !== '' ? (colaborador.fotoUrl) : SemImagem}
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
      :
        <Backdrop open>
          <CircularProgress/>
        </Backdrop>
      }
    </>
    
  );
}

export default Update;