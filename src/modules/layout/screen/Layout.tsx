import Header from "../component/Header";
import Footer from "../component/Footer";
import {Outlet} from "react-router";
import Body from "../component/Body";

const Layout = () => {
  return (
    <>
      <Header/>
      <Body>
        <Outlet/>
      </Body>
      {/*<Footer/>*/}
    </>
  )
}

export default Layout;