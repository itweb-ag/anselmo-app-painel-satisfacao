import {useTheme} from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  
  return (
    <div className={"footer"} style={{backgroundColor: theme.palette.secondary.main}}>
    </div>
  )
}

export default Footer;