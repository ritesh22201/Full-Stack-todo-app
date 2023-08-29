import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Navbar from "./components/Navbar"
import TodoItem from "./components/TodoItem"
import MainRoutes from "./Routes/MainRoutes"

export const App = () => (
  <Box pb={'20px'} bg={'#3450a1'}>
    <Navbar/>
    <MainRoutes />
  </Box>
)
