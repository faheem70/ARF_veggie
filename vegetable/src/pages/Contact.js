import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

const Contact = () => {
  return (
    <Box className="contact-container" py={10}>
      <Container maxW="container.lg">
        <Heading textAlign="center" as="h1" mb={4}>
          Contact Us
        </Heading>

        {/* Contact Form */}
        <Flex mt={8} flexDirection="column">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Your Name" />
          </FormControl>
          <FormControl id="email" isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your Email" />
          </FormControl>
          <FormControl id="message" isRequired mt={4}>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Your Message" />
          </FormControl>
          <Button colorScheme="teal" mt={6}>
            Send Message
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Contact;
