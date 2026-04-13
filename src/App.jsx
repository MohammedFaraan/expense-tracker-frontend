import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import PublicLayout from "./layoutes/PublicLayout";
import PublicRoute from "./components/PublicRoute";
import AppLayout from "./layoutes/AppLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Expenses from "./pages/Expenses";
import CreateExpense from "./pages/CreateExpense";
import NotFoundPage from "./pages/NotFoudPage";

function App() {
  return (
    <main className="min-h-screen my-background">
      <div className="min-h-full ">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/create" element={<CreateExpense />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
