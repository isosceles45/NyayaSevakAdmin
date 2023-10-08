import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from "./components/auth";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
