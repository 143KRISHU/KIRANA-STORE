import { Outlet } from "react-router-dom"
import Header from "./Components/header/Header"
import Footer from "./Components/footer/Footer"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Header/>
      <ToastContainer/>
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
