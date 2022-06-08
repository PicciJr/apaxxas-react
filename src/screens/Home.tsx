import { Flex, Box } from '@chakra-ui/react';
import ATextInput from '../components/ATextInput';

export default function HomeScreen() {
  return (
    <Flex justify="center" align="center" direction="column">
      <Box mb={1}>
        <ATextInput placeholder="Email" />
      </Box>
      <Box>
        <ATextInput placeholder="Password" />
      </Box>
    </Flex>
  );
}
