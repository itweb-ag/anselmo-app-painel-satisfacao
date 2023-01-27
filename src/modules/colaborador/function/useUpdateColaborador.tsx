import axios from "axios";

const useUpdateColaborador = () => {
  return (uuid: string, colaborador: any) => axios.postForm(`${import.meta.env.VITE_API_URL}/satisfacao/colaborador/${uuid}`, colaborador, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export default useUpdateColaborador;
