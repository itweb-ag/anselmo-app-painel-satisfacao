import axios from "axios";

const useDecode = () => {
  return (token: string) => axios.get(`${import.meta.env.VITE_API_URL}/satisfacao/decode/${token}`);
}

export default useDecode;