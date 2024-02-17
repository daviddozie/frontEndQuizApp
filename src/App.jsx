import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage/LandingPage"
import SignUp from "./Pages/SignUpPage/SignUp"
import Quiz from "./Pages/Quiz/Quiz"
import LogIn from "./Pages/LogIn/LogIn"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/meun' element={<LandingPage />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
