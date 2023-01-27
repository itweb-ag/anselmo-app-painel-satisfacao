import {useState} from 'react'
import {createTheme, ThemeProvider} from "@mui/material";
import {UserProvider} from "./modules/login/context/UserContext";
import AuthValidator from "./modules/login/component/AuthValidator/AuthValidator";
import {Outlet} from "react-router";
import {ptBR} from "@mui/material/locale";
import {SnackbarProvider} from 'notistack';
import HttpsRedirect from "./misc/component/HttpsRedirect";

const theme = createTheme({
    palette: {
      primary: {
        main: '#00B48F',
        contrastText: '#e5e5e5'
      },
      secondary: {
        main: '#1F2C5C',
        contrastText: '#e5e5e5'
      },
      info: {
        main: '#848484',
        contrastText: '#ffffff'
      }
    }
  },
  ptBR
)

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <HttpsRedirect>
            <AuthValidator>
              <Outlet/>
            </AuthValidator>
          </HttpsRedirect>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
