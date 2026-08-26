import ReactDOM from "react-dom/client";
import App from "./App";

//The reason for this is that the statement might return value null but the ReactDOM.createRoot does not accept null as parameter. With the ! operator(opens in a new tab), it is possible to assert to the TypeScript compiler that the value is not null.

// interface WellcomeProps {
//   name: string;
// }

// const Wellcome = (props: WellcomeProps) => {
//   return <h1>Hello, {props.name}</h1>;
// };

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
