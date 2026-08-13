import { useContext } from "react";
import CouterContext from "../components/CounterContext";

const useCounter = () => useContext(CouterContext)


export default useCounter