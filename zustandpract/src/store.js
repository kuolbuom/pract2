//The application starts by creating the store, i.e., the global state, using Zustand's create function:
import { create } from 'zustand'

//The function receives as a parameter a function that returns the state to be defined for the application. 
// The parameter is thus the following:
//👉 set => ({
//   counter: 0,
//   increment: () => set(state => ({ counter: state.counter + 1 })),
// })
export const useCounterStore = create(set => ({
  //The state thus has counter defined with a value of zero, and increment which is a function.
  counter: 0,
  //The state function increment, which was defined as follows, is given as the click handler for the "plus" button:
  //This is a function that calls the set function giving another function as a parameter. This function passed as a parameter defines how the state changes:
  actions: {
    increment: () => set(state => ({ counter: state.counter + 1 })),
    decrement: () => set(state => ({ counter: state.counter - 1 })),
    reset: () => set({ counter: 0 })
  }
  // increment: () => set(state => ({ counter: state.counter + 1 })),
  // decrement: () => set(state => ({ counter: state.counter - 1 })),
  // reset: () => set({ counter: 0 })
}))

// the hook functions that are used elsewhere in app
export const useCounter = () => useCounterStore(state => state.counter)
export const useCounterControls = () => useCounterStore(state => state.actions)

export default useCounterStore

//Where do set and state come from?
//Where does set come from? It is a helper function provided by Zustand's create function, used to update the state. create calls the parameter function it receives and automatically passes set to it. You don't need to call or import it yourself; Zustand takes care of that.
//Where does state come from? When a function is given as a parameter to set (instead of a new state object directly), Zustand calls that function with the store's current state as its argument. This way, state-updating functions can access the old state to compute the new one.