import {ReactNode} from "react";

type Argumentos = {
  children: ReactNode
}

const Body = ({children}: Argumentos) => {
  return (
    <div className={"body"}>
      {children}
    </div>
  )
}

export default Body;