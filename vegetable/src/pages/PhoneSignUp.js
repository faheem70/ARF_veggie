import React, { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
    VStack,
    Center,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input/input";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const PhoneSignUp = () => {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const history = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (number === "" || number === undefined)
            return setError("Please enter a valid phone number!");
        try {
            const response = await setUpRecaptha(number);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            await result.confirm(otp);
            history("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Center h="100vh">
            <Box
                p="4"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                maxW="400px"
                w="100%"
            >
                <Text fontSize="2xl" mb="3" textAlign="center">
                    Login with Phone
                </Text>
                {error && <Alert status="error">{error}</Alert>}
                <VStack spacing="4">
                    <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                        <FormControl mb="4" mt="4"> {/* Add margin-top (mt) */}
                            <FormLabel>Enter Phone Number</FormLabel>
                            <PhoneInput
                                defaultCountry="IN"
                                value={number}
                                onChange={setNumber}
                                placeholder="Enter Phone Number"
                                style={{ width: "100%", border: "none", outline: "none" }}
                            />
                        </FormControl>
                        <VStack spacing="4" align="center">
                            <Link to="/">
                                <Button variant="outline" colorScheme="teal" px={6}>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" colorScheme="purple" px={8}>
                                Send OTP
                            </Button>
                        </VStack>
                    </form>

                    <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                        <FormControl>
                            <FormLabel>Enter OTP</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </FormControl>
                        <VStack spacing="4" align="center" mx={4}>
                            <Link to="/">
                                <Button variant="outline" colorScheme="teal" px={6}>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" colorScheme="purple" px={8}>
                                Verify
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Center>
    );
};

export default PhoneSignUp;
