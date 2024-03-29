import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={ <ProtectedRoute> <Chat /> </ProtectedRoute> }/>
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
