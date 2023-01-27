import axios from "axios";

const useUpdateColaborador = () => {
  return (colaborador: any) => axios.postForm(`${import.meta.env.VITE_API_URL}/satisfacao/colaborador`, colaborador, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export default useUpdateColaborador;
