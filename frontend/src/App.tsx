import './App.css'
import 'modern-css-reset'
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import Main from "./components/Main.tsx";
import NotFound from "./components/NotFound.tsx";

function App() {

  return (
    <div className="App">
      <SignIn />
      <SignUp />
      <Main />
      <NotFound />
    </div>
  )
}

export default App
