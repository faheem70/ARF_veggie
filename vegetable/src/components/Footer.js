import React from 'react';
import {
    Box,
    Container,
    Flex,
    Text,
    Link,
    VStack,
    IconButton,
    Image,
    HStack,
    Spacer,
    useMediaQuery,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import veg from '../assest/veg.avif';

function Footer() {
    const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

    return (
        <Box as="footer" bg="gray.800" color="white" py={{ base: 6, md: 10 }}>
            <Container maxW="container.lg">
                <Flex flexWrap="wrap" alignItems="center">
                    <Box flexBasis={{ base: '100%', md: '20%' }} mb={{ base: 5, md: 0 }}>
                        <Box ml={{ base: 5, md: 0 }}>
                            <Link href="/">
                                <Image src={veg} alt="" maxH="80px" />
                            </Link>
                        </Box>
                    </Box>
                    <Box flexBasis={{ base: '100%', md: '20%' }}>
                        <VStack align="flex-start">
                            <Text fontSize="xl" fontWeight="bold">
                                Menu
                            </Text>
                            <Link href="/">Home</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact Us</Link>
                            <Link href="/faq">FAQs</Link>
                            <Link href="/contact">Why Veggies?</Link>
                        </VStack>
                    </Box>
                    <Box flexBasis={{ base: '100%', md: '40%' }}>
                        <Box className="footer_item footer_menu">
                            <Text fontSize="xl" fontWeight="bold">
                                Contacts
                            </Text>
                            <Text>
                                <strong>Veggies to Doorsteps Corporate Office</strong>
                                <br />
                                Plot no. C-10, TTC Industrial Estate,
                                <br />
                                MIDC road Main chawk, Azamgarh
                                <br />
                                Azamgarh - 400705
                            </Text>
                            <Text>
                                <Link href="tel:+911******45" title="customer care number">
                                    1800 267 0997
                                </Link>
                                <br />
                                <Link
                                    href=""
                                    title="customer care email"
                                >
                                    customercare@veggiestodoorstep.in
                                </Link>
                            </Text>
                            <HStack spacing={2} mt={{ base: 4, md: 0 }}>
                                <IconButton
                                    as={Link}
                                    href="https://www.facebook.com/kisankonnect.india/?ref=page_internal"
                                    target="_blank"
                                    aria-label="Facebook"
                                    icon={<FaFacebook />}
                                    size="lg"
                                    bg="blue.500"
                                    _hover={{ bg: 'blue.600' }}
                                />
                                <IconButton
                                    as={Link}
                                    href="https://www.facebook.com/kisankonnect.india/?ref=page_internal"
                                    target="_blank"
                                    aria-label="Twitter"
                                    icon={<FaTwitter />}
                                    size="lg"
                                    bg="twitter.500"
                                    _hover={{ bg: 'twitter.600' }}
                                />
                            </HStack>
                        </Box>
                    </Box>
                    {isLargerThanMd && (
                        <Spacer />
                    )}
                    <Box flexBasis={{ base: '100%', md: '20%' }}>
                        {/* Add your DOWNLOAD THE APP section here */}
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}

export default Footer;
