import { Box } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute'

const MainRoutes = () => {
  return (
    <Box>
        <Routes>
            <Route path='/' element={<PrivateRoute>
              <Home/>
            </PrivateRoute>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='*' element={<h1>Page Not Found..</h1>}/>
        </Routes>
    </Box>
  )
}

export default MainRoutes