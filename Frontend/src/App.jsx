import { Outlet, useNavigate } from "react-router-dom"
import Header from "./Components/header/Header"
import Footer from "./Components/footer/Footer"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import backendRoutesAPI from "./BackendAPI/API.js"
import customerContext from "./Context/index.js";
import { useDispatch } from "react-redux"
import { setCustomerDetail } from "./Store/customerSlice.js";

function App() {

  const dispatch = useDispatch()

  const getCustomerDetail = async () => {
    const backendAPIResponse = await fetch(backendRoutesAPI.current_user.url, {
      method: backendRoutesAPI.current_user.method,
      credentials: "include"
    })
    const finalResponse = await backendAPIResponse.json()
    if (finalResponse.success) {
      dispatch(setCustomerDetail(finalResponse.data))
      return finalResponse
    }
    else {
      return finalResponse
    }
  }

  useEffect(() => {
    getCustomerDetail()
  }, [])
  return (
    <>
      <customerContext.Provider value={{ getCustomerDetail }}>
        <Header />
        <main className="main">
          <section className="container h-full">
            <ToastContainer />
            <Outlet />
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </customerContext.Provider>
    </>

  )
}

export default App
