import useField from "./useField"
import useLocalStorage from "./useLocalStorage"


const App = () => {
  const [name, setName] = useLocalStorage('name', '')
  return (
    <div>
 
        name: <input value={name} onChange={(e)=> setName(e.target.value)} />
       
      <div>
       Hello, {name}! (your name is stored in localStorage)
      </div>
    </div>
  )
}

export default App

//before localStorage
// import useField from "./useField"


// const App = () => {
//  const name = useField('text')
//  const born = useField('text')
//  const height = useField('text')
//   return (
//     <div>
//       <form>
//         name: <input {...name} />
//         <br />
//         birthdate: <input {...born} />
//         <br />
//         height: <input {...height} />
//       </form>

//       <div>
//         {name.value}, born {born.value}, height {height.value}
//       </div>
//     </div>
//   )
// }

//before spread atributes
// const App = () => {
//  const name = useField('text')
//  const born = useField('text')
//  const height = useField('text')
//   return (
//     <div>
//       <form>
//         name: <input
//          type={name.type}
//          value={name.value}
//          onChange={name.onChange}
//         />
//         <br />
//         birthdate: <input
//          type={born.type} 
//          value={born.value}
//          onChange={born.onChange}
//         />
//         <br />
//         height: <input
//          type={height.type} 
//          value={height.value}
//          onChange={height.onChange}
//         />
//       </form>

//       <div>
//         {name.value}, born {born.value}, height {height.value}
//       </div>
//     </div>
//   )
// }


//before hook

// const App = () => {
//   const [name, setName] = useState('')
//   const [born, setBorn] = useState('')
//   const [height, setHeight] = useState('')

//   return (
//     <div>
//       <form>
//         name: <input
//          type="text"
//          value={name}
//          onChange={(e) => setName(e.target.value)}
//         />
//         <br />
//         birthdate: <input
//          type="text" 
//          value={born}
//          onChange={(e)=> setBorn(e.target.value)}
//         />
//         <br />
//         height: <input
//          type="text" 
//          value={height}
//          onChange={(e)=> setHeight(e.target.value)}
//         />
//       </form>

//       <div>
//         {name}, born {born}, height {height}
//       </div>
//     </div>
//   )
// }