import './App.css'
import 'modern-css-reset'
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import Main from "./components/Main.tsx";
import NotFound from "./components/NotFound.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {GuestRoute, PrivateRoute} from "./AppRoute.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<GuestRoute><SignIn /></GuestRoute>} />
        <Route path="signup" element={<GuestRoute><SignUp /></GuestRoute>} />
        <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
