import { Box } from '@chakra-ui/react';
import ATextInput from '../components/ATextInput';
import AButton from '../components/AButton';
import { useState, useEffect } from 'react';
import { useAuthenticate } from '../../application/authenticate';
import { NotFoundError } from '../../domain/Errors/NotFoundError';
import { useGlobalContext } from '../../services/globalContext';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/resumen');
  }, []);

  const handleUserLogin = async () => {
    try {
      const { login } = useAuthenticate();
      const user = await login(email, password);
      updateUser(user);
      navigate('/resumen');
    } catch (err) {
      new NotFoundError('User not found', err);
      console.log('ERROR user login', err);
    }
  };

  const handleGoogleLogin = async () => {
    const { googleLogin } = useAuthenticate();
    const user = await googleLogin();
    updateUser(user);
    navigate('/resumen');
  };

  return (
    <div className="flex flex-col justify-center h-screen px-8 overflow-scroll">
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
      <AButton
        text="Iniciar sesión con Google"
        color="purple"
        clickHandler={handleGoogleLogin}
      />
    </div>
  );
}
