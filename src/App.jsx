import './index.css';
import Landing from './pages/Landing';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-sky-950 to-blue-900 h-screen container">
      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App;