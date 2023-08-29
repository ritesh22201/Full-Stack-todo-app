import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { getTodos, postTodos } from '../redux/todosReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

const TodoInput = () => {
    const [todo, setTodo] = useState<string>('');
    const dispatch: Dispatch<any> = useDispatch();
    const toast = useToast();
    const value: string | null = localStorage.getItem('token');
    const token: { [key: string]: any } | null = value ? JSON.parse(value) : null;
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!todo){
            toast({
                title : "All fields are required",
                description : "Can't post empty todo",
                status : 'warning',
                isClosable : true,
                duration : 4000,
                position : 'top'
            })
            return;
        }

        const newTodo = {
            title: todo,
            created_at: Date.now(),
            priority: Math.ceil(Math.random() * 10),
            status: false
        }

        await dispatch(postTodos(newTodo));
        await dispatch(getTodos(token?.token));
        setTodo('');
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Flex w={{ base: '90%', sm: '90%', md: '90%', lg: '60%', xl: '50%' }} m={'auto'} alignItems={'center'} gap={'20px'}>
                    <Input value={todo} onChange={(e) => setTodo(e.target.value)} focusBorderColor='none' border={'none'} borderBottom={'1px inset'} color={'gray.300'} m={'20px 0'} type='text' placeholder='Add a todo...' />
                    <Button type='submit' w={'50px'} h={'45px'} id='addBtn' borderRadius={'50%'} bg={'#041955'} color={'gray.300'}>{<FaPlus />}</Button>
                </Flex>
            </form>
        </Box>
    )
}

export default TodoInput;