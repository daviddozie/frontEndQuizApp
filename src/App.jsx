import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage/LandingPage"
import SignUp from "./Pages/SignUpPage/SignUp"
import Quiz from "./Pages/Quiz/Quiz"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/meun' element={<LandingPage />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
