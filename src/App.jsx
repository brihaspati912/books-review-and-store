
import { Outlet } from 'react-router-dom'
import './App.css'
import React from 'react'
import './index.css'
import Navbar from './components/Navbar'


function App() {
  return (
    <>
      <Navbar />
      <main className='min-h-screen max-w-screen-2xl mx- px-4 py-6 font-secondary' >
        <Outlet /> {/*import all the childrens from the app.*/}
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
