import './App.css'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={< PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
