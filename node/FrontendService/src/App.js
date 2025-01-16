import Drive from "./components/Drive";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
  <>
  <Router>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/drive" element={<Drive/>}/>
    </Routes>
    <Footer/>
  </Router>

  </>
  );
}

export default App;
