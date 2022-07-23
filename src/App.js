import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUpdate from "./pages/AddUpdate";
import About from "./pages/About";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import View from "./pages/View";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <ToastContainer position="top-center"/>
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/add" element={<AddUpdate/> }/>
          <Route path="/update/:id" element={<AddUpdate/> }/>
          <Route path="/view/:id" element={<View/> }/>
          <Route path="/about" element={<About/> }/>
          <Route path="/search" element={<Search/> }/>
        </Routes>
        

      </div>
    </BrowserRouter>
  );
}

export default App;
