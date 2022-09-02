import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


import { Socket} from 'phoenix'
const socket = new Socket('ws://localhost:4000/socket')
socket.connect()
let channel = socket.channel("counter:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })



function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("")
  const handleClick = ()=> {
    setCount((count) => count + 1)
    channel.push('count', {count: count +1})
  }

  
  channel.on("shout", resp =>{
    setMsg(resp.count)
  })  
    
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="http://localhost:4000">Phoenix App</a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">Total clicks received: {msg}</div>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
