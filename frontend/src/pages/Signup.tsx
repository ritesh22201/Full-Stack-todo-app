import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/authReducer/action';
import { Dispatch } from 'redux';

export type Form = {
  name: string;
  email: string;
  pass: string;
  age: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { isError, isRegistered } = useSelector((store: any) => store.authReducer);
  const toast = useToast();

  const [formData, setFormData] = useState<Form>({
    name: '',
    email: '',
    pass: '',
    age: ''
  })

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Registration Failed',
        description: isError,
        position : 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
    else if(isRegistered){
      toast({
        title: 'Success',
        description: isRegistered,
        position : 'top',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })

      setTimeout(() => {
        navigate('/login');
        window.location.reload();
      }, 4000)
    }
  }, [isError, isRegistered])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signup(formData));
    setFormData({
      name: '',
      email: '',
      pass: '',
      age: ''
    })
  }

  return (
    <Flex
      bg={'#3450a1'}
      minH={'100vh'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} w={{base : '95%', sm : '95%', md : '83%', lg : '50%', xl : '40%'}} py={12} px={6}>
        <Stack align={'center'}>
          <Heading color={'gray.300'} fontSize={'4xl'} textAlign={'center'}>
            SIGN UP
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <VStack w={'100%'}>
                {/* <Box> */}
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" name='name' value={formData.name} onChange={(e) => handleChange(e)} />
                  </FormControl>
                {/* </Box> */}
                {/* <Box> */}
                  <FormControl id="lastName">
                    <FormLabel>Age</FormLabel>
                    <Input type="text" name='age' value={formData.age} onChange={(e) => handleChange(e)} />
                  </FormControl>
                {/* </Box> */}
              </VStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' value={formData.email} onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name='pass' value={formData.pass} onChange={(e) => handleChange(e)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  loadingText="Submitting"
                  size="lg"
                  bg={'#041955'}
                  color={'white'}
                  _hover={{
                    bg: '#092a87',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to={'/login'} style={{color : 'blue'}}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}