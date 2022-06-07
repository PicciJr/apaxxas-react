import { Flex, Box } from "@chakra-ui/react";
import AButton from "../components/AButton";
import ATextInput from "../components/ATextInput";
import { ColorTone, Color } from "../types/icolor";

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
