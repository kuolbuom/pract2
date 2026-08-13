import { createContext, useState } from "react";

const CouterContext = createContext()

export default CouterContext

export const CounterContextProvider = (props) => {
  const [counter, setCounter] = useState(0)

  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return (
    <CouterContext.Provider value={{ counter, setCounter, increment, decrement, zero }}>
      {props.children}
    </CouterContext.Provider>
  )
}

