import { useContext } from "react"
import useCounter from "../hook/useCounter"
const Display = () => {
 const { counter } = useCounter()
  return (
    <div>{counter}</div>
  )
}

export default Display