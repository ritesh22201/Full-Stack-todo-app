import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { login } from '../redux/authReducer/action';

export type LoginType = {
  email: string;
  pass: string;
}

export default function Login() {
  const dispatch: Dispatch<any> = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { token, isAuth, isError } = useSelector((store: any) => store.authReducer);
  const [formData, setFormData] = useState<LoginType>({
    email: '',
    pass: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(formData));
    setFormData({
      email: '',
      pass: ''
    })
  }

  useEffect(() => {
    if (token.token) {
      localStorage.setItem('token', JSON.stringify(token));
        toast({
          title: 'Success',
          description: 'User logged in successfully',
          position: 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })

        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 4000)
        
    }
    else if (isError) {
      toast({
        title: 'Login Failed!!',
        description: isError,
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [isAuth, token, isError])

  return (
    <Flex
      bg={'#3450a1'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}>
      <Stack w={{ base: '95%', sm: '95%', md: '83%', lg: '50%', xl: '40%' }} spacing={8} mx={'auto'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading color={'gray.300'} fontSize={'4xl'}>SIGN IN</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' value={formData.email} onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password <span style={{ color: 'red' }}>*</span></FormLabel>
                <Input type="password" name='pass' value={formData.pass} onChange={(e) => handleChange(e)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Text>New here ? </Text>
                  <Link to={'/signup'} style={{ color: 'blue' }}>Signup</Link>
                </Stack>
                <Button
                  type='submit'
                  bg={'#041955'}
                  color={'white'}
                  _hover={{
                    bg: '#092a87',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}