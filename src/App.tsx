import { Link, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Teachers from './pages/Teacher/Teachers'
import Home from './pages/Home/Home'


function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/teachers">Teachers</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </>
  )
}

export default App
