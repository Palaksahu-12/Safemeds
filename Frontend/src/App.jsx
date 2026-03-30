import {BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Medicines from "./components/Medicines/Medicines.jsx";
import Awarness from "./components/Awarness/Awarness.jsx";
import Register from "./components/Register/Register.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import Chatbox from "./components/Chatbox/Chatbox.jsx";

function App() {
  return (    
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/awareness" element={<Awarness />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/chat" element={<Chatbox />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
