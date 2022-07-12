import { Box } from '@chakra-ui/react';
import ATextInput from '../components/ATextInput';
import AButton from '../components/AButton';
import { useState } from 'react';
import { useAuthenticate } from '../../application/authenticate';
import { NotFoundError } from '../../domain/Errors/NotFoundError';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleUserLogin = async () => {
    try {
      const { login } = useAuthenticate();
      const user = await login(email, password);
    } catch (err) {
      new NotFoundError('User not found', err);
      console.log('ERROR user login', err);
    }
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
      <div className="self-center w-fit">
        <AButton
          text="Iniciar sesión"
          color="purple"
          clickHandler={handleUserLogin}
        />
      </div>
    </div>
  );
}
