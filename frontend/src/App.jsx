import { useEffect, lazy, Suspense} from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

const style = { display: "flex", gap: "8px", padding: "8px" };
// const LazyHome = lazy(()=> import('./Home'))
// const LazySettings = lazy(()=> import('./Settings'))
import { Home} from './Home'
import {Settings} from './Settings'


function App() {
  /**
   * During development we can still access the base path at `/`
   * And this hook will make sure that we land on the base `/app`
   * path which will mount our App as usual.
   * In production, Phoenix makes sure that the `/app` route is
   * always mounted within the first request.
   * */
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  return (
    <BrowserRouter basename="app">

      <nav style={style}>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings Page</Link>
        <a href='http://localhost:4000' alt="naivigate to phoenix">Phoenix</a>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={
            <Home />

        
        } />
        <Route path="settings" element={
              <Settings/>

        }/>
      </Routes>
    </BrowserRouter>
  );
}

// {/* <a href='http://localhost:4000' target="_blank" rel="noreferrer">Phoenix</a> */}




export default App;

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
*/