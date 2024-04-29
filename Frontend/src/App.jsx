import { Outlet } from "react-router-dom"
import Header from "./Components/header/Header"
import Footer from "./Components/footer/Footer"
function App() {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
