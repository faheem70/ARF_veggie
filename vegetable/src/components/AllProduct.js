import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Heading, Flex } from "@chakra-ui/react";
import CardFeature from "./CardFeature";
import FilterCard from "./FilterCard";

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map((el) => el.category))];

    // filter data display
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilterProduct = (category) => {
        setFilterBy(category);
        const filter = productData.filter(
            (el) => el.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };

    return (
        <Box my={5}>
            <Heading
                as="h2"
                fontSize="2xl"
                fontWeight="bold"
                color="slate.800"
                mb={4}
                textAlign="center"
            >
                {heading}
            </Heading>

          <Flex gap={4} justify="center" overflowX="auto" sx={{ scrollbar: "none" }}>
              {categoryList[0] &&
                  categoryList.map((el) => {
                      return (
                          <FilterCard
                              category={el}
                              key={el}
                              isActive={el.toLowerCase() === filterby.toLowerCase()}
                              onClick={() => handleFilterProduct(el)}
                          />
            );
          })}
          </Flex>

          <Flex flexWrap="wrap" justify="center" gap={4} my={4}>
              {dataFilter[0] &&
                  dataFilter.map((el) => {
                      return (
                          <CardFeature
                              key={el._id}
                              id={el._id}
                              image={el.image}
                              name={el.name}
                              category={el.category}
                              price={el.price}
                          />
                      );
          })}
          </Flex>
      </Box>
  );
};

export default AllProduct;
