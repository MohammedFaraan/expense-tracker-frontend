import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <main className="min-h-screen my-background">
      {/* <button className='btn btn-active'>Hello world</button> */}
      <Navbar />
      <div className="min-h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
