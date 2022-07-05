import { Box } from '@chakra-ui/react';
import ATextInput from '../components/ATextInput';

export default function HomeScreen() {
  return (
    // TODO: input handlers
    <div className="flex flex-col items-center justify-center h-screen overflow-scroll">
      <Box mb={1}>
        <ATextInput placeholder="Email" onInputHandler={null} />
      </Box>
      <Box>
        <ATextInput placeholder="Password" onInputHandler={null} />
      </Box>
    </div>
  );
}
