import { Route,Routes } from "react-router-dom"

import AboutUs from "./pages/AboutUs"
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <>
    <Routes >
      <Route path="/" element={<HomePage/>}> </Route>
      <Route path="/about" element={<AboutUs/>}> </Route>
      <Route path="/signup" element={<SignUp/>}> </Route>
      <Route path="/login" element={<LogIn/>}> </Route>


      <Route path="*" element={<NotFound />}></Route>
    </Routes>
    </>
  )
}

export default App
