import { Box, Button, Checkbox, Flex, Heading, IconButton, Input, Radio, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTodo, editTodo, getTodos, updateStatus } from '../redux/todosReducer/action';
import { FaEdit, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

export interface Todo {
    _id: string;
    title: string;
    status: boolean;
    created_at?: string;
}

const TodoItem = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const value: string | null = localStorage.getItem('token');
    const token: { [key: string]: any } | null = value ? JSON.parse(value) : null;
    const { data, deletedMsg, isDeleted, totalTodos } = useSelector((store: any) => store.todoReducer);
    const [editInput, setEditInput] = useState<boolean[]>(Array(data.length).fill(false));
    const [title, setTitle] = useState<string>('');
    const [limit, setLimit] = useState<number>(4);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [originalData, setOriginalData] = useState<Todo[]>([]);
    const toast = useToast();

    // let monthArr:string[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        const total = Math.ceil(totalTodos / limit);
        setTotalPages(total)
    }, [totalTodos, limit])

    useEffect(() => {
        setOriginalData(data);
    }, [data])

    useEffect(() => {
        if (token && token.token) {
            dispatch(getTodos(token.token, '', '', page, limit));
        }

    }, [token?.token, page, limit])

    const handleStatus = async (id: string) => {
        const todo = data.find((el: Todo) => el._id === id);
        if (todo) {
            const newStatus = !todo.status;
            await dispatch(editTodo(todo._id, '', newStatus));
        }

        await dispatch(getTodos(token?.token));
    }

    const handleDelete = async (id: string) => {
        await dispatch(deleteTodo(id));
        dispatch(getTodos(token?.token));
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>, id: string, i: number) => {
        e.preventDefault();

        await dispatch(editTodo(id, title, false));

        const updatedEditInput = editInput.map((value, index) =>
            index === i ? false : value
        );

        setEditInput(updatedEditInput);
        await dispatch(getTodos(token?.token));
    }

    useEffect(() => {
        if (isDeleted || deletedMsg) {
            toast({
                title: 'Success',
                description: deletedMsg,
                position: 'top',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        }
    }, [isDeleted, deletedMsg])

    const handlePendingTasks = () => {
        let updatedData = [...data];
        updatedData = updatedData.filter(el => el.status === false);
        setOriginalData(updatedData);
    }

    const handleCompletedTasks = () => {
        let updatedData = [...data];
        updatedData = updatedData.filter(el => el.status === true);
        setOriginalData(updatedData);
    }

    const handleAllTasks = () => {
        setOriginalData(data);
    }

    const handleTodaysTasks = () => {
        const date = new Date();
        const formattedDate = date.toISOString();
        // console.log(formattedDate)
        let updatedData = [...data];
        updatedData = updatedData.filter(el => el.created_at.toString().split('T')[0] === formattedDate.toString().split('T')[0]);

        setOriginalData(updatedData)
    }

    return (
        <Box p={'10px 15px'} w={{ base: '100%', sm: '100%', md: '90%', lg: '60%', xl: '50%' }} m={'30px auto'}>

            <Flex transition={'ease-in'} transitionDuration={'1s'} justifyContent={'space-between'} alignItems={'center'}>
                <Button onClick={handleTodaysTasks} color={'gray.600'} size={'md'}>TODAY'S - {data.filter((el: any) => (el.created_at?.toString().split('T')[0]) === (new Date().toISOString().split('T')[0])).length}</Button>
                <Button onClick={handleAllTasks} color={'gray.600'} size={'md'}>ALL - {data.length}</Button>
                <Button onClick={handlePendingTasks} color={'gray.600'} size={'md'}>PENDING - {data.filter((el: any) => el.status === false).length}</Button>
                <Button onClick={handleCompletedTasks} color={'gray.600'} size={'md'}>COMPLETED - {data.filter((el: any) => el.status === true).length}</Button>
            </Flex>
            {originalData.length ? originalData?.map((el: Todo, i: number) => {
                return <Flex opacity={el.status ? '0.7' : ''} bg={el.status ? '#7286b5' : '#041955'} color={'gray.300'} p={'25px 10px'} borderRadius={'7px'} m={'30px 0'} boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' key={i + 1} justifyContent={'space-between'} alignItems={'center'}>
                    <Flex alignItems={'center'} gap={'20px'}>
                        <Checkbox isChecked={el.status} onChange={() => handleStatus(el._id)} borderColor={'#eb06ff'} />
                        {editInput[i] ?
                            <form onSubmit={(e) => handleEdit(e, el._id, i)}>
                                <Input value={title} id='inputTodo' onChange={(e) => setTitle(e.target.value)} focusBorderColor='none' w={'90%'} type='text' placeholder='Edit todo....' />
                            </form>
                            :
                            <Text textDecoration={el.status ? 'line-through' : 'none'} textDecorationThickness={'3px'} textDecorationColor={'#ba1ec5'} fontWeight={'bold'}>{el.title}</Text>
                        }
                    </Flex>
                    <Text>{el.created_at?.split('T')[0]}</Text>
                    <Flex gap={'10px'}>
                        <Button onClick={() => {
                            let updatedInput = [...editInput];

                            const prevOpenedIndex = updatedInput.findIndex(opened => opened);
                            if (prevOpenedIndex !== -1) {
                                updatedInput[prevOpenedIndex] = false;
                            }

                            updatedInput[i] = !updatedInput[i];
                            setEditInput(updatedInput);
                            setTitle(el.title);


                        }} isDisabled={el.status === true} _hover={{ backgroundColor: '#237afe' }} borderRadius={'50%'} bg={'#237afe'} color={'gray.200'}>{<FaEdit />}</Button>
                        <Button onClick={() => handleDelete(el._id)} color={'gray.200'} fontSize={'25px'} w={'40px'} _hover={{ backgroundColor: '#e65b65' }} bg={'#e65b65'} borderRadius={'50%'}>{<FaTrash />}</Button>
                    </Flex>
                </Flex>
            })
                :
                <Box p={'30px 0'} display={'grid'} placeItems={'center'}>
                    <Heading size={'lg'} color={'gray.300'}>No todo found!!</Heading>
                </Box>
            }
            {originalData?.length ? <Flex justifyContent={'center'} gap={'10px'}>
                <IconButton isDisabled={page == 1} onClick={() => setPage(page - 1)} aria-label='Search database' icon={<ArrowLeftIcon />} />
                {new Array(totalPages).fill(0).map((el, i) => {
                    return <Button key={i + 1} isDisabled={page === i + 1} color={'#eb06ff'} onClick={() => setPage(i + 1)}>{i + 1}</Button>
                })}
                <IconButton isDisabled={page == totalPages} onClick={() => setPage(page + 1)} aria-label='Search database' icon={<ArrowRightIcon />} />
            </Flex>
                :
                ''
            }
        </Box>
    )
}

export default TodoItem;

