import './App.css'
import 'modern-css-reset'
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import Main from "./components/Main.tsx";
import NotFound from "./components/NotFound.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
