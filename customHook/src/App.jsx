import useCounter from "./useCounter"

//The same hook could be reused in the application that was keeping track of the number of clicks made to the left and right buttons:
const App = () => {
 const left = useCounter()
 const  right = useCounter()

  return (
    <div>
      { left.value } <button onClick={left.increase}>left</button>

      <button onClick={right.increase}>right</button> { right.value }
    </div>
  )
}

export default App

//after extraction

// const App = () => {
//  const counter = useCounter()

//   return (
//     <div>
//       <div>{ counter.value }</div>
//       <button onClick={counter.increase}>plus</button>
//       <button onClick={counter.decrease}>minus</button>
//       <button onClick={counter.zero}>zero</button>
//     </div>
//   )
// }



//before extraction

// const App = () => {
//  const [counter, setCounter] = useState(0)

//   return (
//     <div>
//       <div>{ counter }</div>
//       <button onClick={() => setCounter(counter + 1)}>plus</button>
//       <button onClick={() => setCounter(counter - 1)}>minus</button>
//       <button onClick={() => setCounter(0)}>zero</button>
//     </div>
//   )
// }
