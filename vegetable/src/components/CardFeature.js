import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartitems } from '../redux/productSlice';
import {
    Box,
    Image,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react';

const CardFeature = ({ image, name, price, category, loading, id }) => {
    const dispatch = useDispatch();

    const handleAddCartProduct = () => {
        dispatch(addCartitems({
            _id: id,
            name: name,
            price: price,
            category: category,
        image: image,
    }));
  };

    return (
      <Box
          w="200px"
          minW="200px"
          maxW="200px"
          bg="white"
          boxShadow="lg"
          py="5"
          px="4"
          cursor="pointer"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
          _hover={{
              transform: 'translateY(-5px)',
              boxShadow: 'xl',
          }}
      >
          {image ? (
              <>
                  <Link
                      to={`/menu/${id}`}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="link-no-underline"
                  >
                      <Box h="150px" display="flex" alignItems="center" justifyContent="center">
                          <Image src={image} alt="vegetable" maxH="100%" />
                      </Box>
                      <Heading
                          fontSize="lg"
                          fontWeight="semibold"
                          color="slate.600"
                          mt="4"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                      >
                          {name}
                      </Heading>
                      <Text color="slate.500" fontWeight="medium">{category}</Text>
                      <Text fontWeight="bold">
                          <Box as="span" color="red.500">
                              ₹
                          </Box>
                          <Box as="span">{price}</Box>
                      </Text>
                  </Link>
                  <Button
                      mt="2"
                      bg="green.400"
                      py="1"
                      rounded="md"
                      _hover={{ bg: 'green.600' }}
                      onClick={handleAddCartProduct}
                      w="100%"
                  >
                      Add to Cart
                  </Button>
              </>
          ) : (
              <Box minH="150px" display="flex" justifyContent="center" alignItems="center">
                  <Text>{loading}</Text>
              </Box>
          )}
        </Box>
    );
};

export default CardFeature;
