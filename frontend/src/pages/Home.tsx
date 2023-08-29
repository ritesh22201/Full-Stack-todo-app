import { Box } from '@chakra-ui/react';
import React from 'react'
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';

const Home = () => {
  const token: string | null = localStorage.getItem('token');
  return (
    <Box minH={'100vh'}>
      {token && <TodoInput />}
      {token && <TodoItem />}
    </Box>
  )
}

export default Home;