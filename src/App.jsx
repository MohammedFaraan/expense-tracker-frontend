import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

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
    </main>
  );
}

export default App;
