// import { useCounterStore } from './store'
import { useCounterControls } from './store'

const Controls = () => {
  //The application's components can access the values and functions defined in the state through the useCounterStore function defined using Zustand's create. The App component uses selectors to retrieve the counter value and the increment function from the state:
  // using selector to pick right part of the store state
  //The code stores counter value of the store into a variable as follows:
  //A selector function state => state.counter is used, which determines what is returned from the store's contents. In the same way, the function stored in the store is retrieved into the variable increment.
  // const increment = useCounterStore(state => state.increment)
  // const decrement = useCounterStore(state => state.decrement)
  // const reset = useCounterStore(state => state.reset)
  const { increment, decrement, reset } = useCounterControls()

  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default Controls