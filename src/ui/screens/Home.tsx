import { Box } from '@chakra-ui/react';
import ATextInput from '../components/ATextInput';
import AButton from '../components/AButton';
import { useState, useEffect } from 'react';
import { useAuthenticate } from '../../application/authenticate';
import { NotFoundError } from '../../domain/Errors/NotFoundError';
import { useGlobalContext } from '../../services/globalContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser, isPending } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/resumen');
  }, [user]);

  const handleUserLogin = async () => {
    try {
      const { login } = useAuthenticate();
      const user = await login(email, password);
      updateUser(user);
      navigate('/resumen');
    } catch (err) {
      new NotFoundError('User not found', err);
      console.error('ERROR user login', err);
    }
  };

  const handleGoogleLogin = async () => {
    const { googleLogin } = useAuthenticate();
    const user = await googleLogin();
    updateUser(user);
    navigate('/resumen');
  };

  return (
    <div className="absolute flex flex-col justify-center px-8 pb-24 overflow-scroll transform -translate-x-1/2 translate-y-1/2 left-1/2 sm:overflow-hidden">
      {isPending && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {!isPending && (
        <>
          <Box mb={1}>
            <ATextInput placeholder="Email" onInputHandler={setEmail} />
          </Box>
          <Box mb={4}>
            <ATextInput
              placeholder="Password"
              onInputHandler={setPassword}
              type="password"
            />
          </Box>
          <AButton
            text="Iniciar sesión"
            color="purple"
            clickHandler={handleUserLogin}
          />
          <Box mb={4}></Box>
          <hr className="mb-8" />
          <AButton
            text="Iniciar sesión con Google"
            color="purple"
            clickHandler={handleGoogleLogin}
            variant="outline"
          />
        </>
      )}
    </div>
  );
}
