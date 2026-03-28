import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <main className="min-h-screen my-background">
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
