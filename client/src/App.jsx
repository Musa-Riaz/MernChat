import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Signin from './pages/Signin'

const App = () => {
  return (
    <Routes>
      <Route path='/register' element = {<Register />} />
      <Route path='/signin' element = {<Signin />} />
    </Routes>
  )
}

export default App
