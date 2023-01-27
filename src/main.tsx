import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.min.css';
import {MemoryRouter, Route, Routes} from "react-router";
import Layout from "./modules/layout/screen/Layout";
import Inicio from "./modules/inicio/screen/Inicio";
import {FindAll as InicioColaborador} from "./modules/colaborador/screen/FindAll";
import {Create as CreateColaborador} from "./modules/colaborador/screen/Create";
import {Find as ReadColaborador} from "./modules/colaborador/screen/Find";
import {Update as UpdateColaborador} from "./modules/colaborador/screen/Update";
import {FindAll as InicioUsuario} from "./modules/usuario/screen/FindAll";
import {Create as CreateUsuario} from "./modules/usuario/screen/Create";
import {Update as UpdateUsuario} from "./modules/usuario/screen/Update";
import RelatorioGeral from "./modules/relatorio/screen/RelatorioGeral";
import RelatorioColaborador from "./modules/relatorio/screen/RelatorioColaborador";
import {FindAll as InicioLog} from "./modules/log/screen/FindAll";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MemoryRouter>
    <Routes>
      <Route element={<App/>}>
        <Route path={"/"} element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          
          <Route path={"colaborador"}>
            <Route index element={<InicioColaborador/>}/>
            <Route path={"create"} element={<CreateColaborador/>}/>
            <Route path={"read/:uuid"} element={<ReadColaborador/>}/>
            <Route path={"update/:uuid"} element={<UpdateColaborador/>}/>
          </Route>
          
          <Route path={"relatorio"} element={<RelatorioGeral/>}/>
          <Route path={"relatorio/:uuid"} element={<RelatorioColaborador/>}/>
  
          <Route path={"log"} element={<InicioLog/>} />
          
          <Route path={"usuario"}>
            <Route index element={<InicioUsuario/>}/>
            <Route path={"create"} element={<CreateUsuario/>}/>
            <Route path={"update/:uuid"} element={<UpdateUsuario/>}/>
          </Route>
          
          <Route path={"*"} element={<>Not found</>}/>
        </Route>
      </Route>
    </Routes>
  </MemoryRouter>
)
