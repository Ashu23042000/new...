import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Peoples from "./pages/Peoples/Peoples";
import Call from "./pages/Call/Call";
// import { useSelector } from "react-redux";

import { ContextProvider } from "./SocketContext";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" exact element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="/people" exact element={<ProtectedRoute>
          <ContextProvider>
            <Peoples />
          </ContextProvider>
        </ProtectedRoute>} />
        <Route path="/call/:from/:to/:caller" exact element={<ProtectedRoute>
          <ContextProvider>
            <Call />
          </ContextProvider>
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  );
}


const GuestRoute = ({ children }) => {

  const isAuth = localStorage.getItem("isAuth");
  const location = useLocation();
  if ((JSON.parse(isAuth)))
    return <Navigate to="/people" state={{ from: location }} />
  else
    return children;
}


const ProtectedRoute = ({ children }) => {

  const isAuth = localStorage.getItem("isAuth");



  const location = useLocation();
  if (!(JSON.parse(isAuth)))
    return <Navigate to="/login" state={{ from: location }} />
  else
    return children;
}



export default App;
