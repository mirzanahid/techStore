import {
  Container,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import UpdateProductModal from "../components/UpdateProductModal";

const HomePage = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [singleProduct, setSingleProduct] = useState(null);

  const handleEditClick = (product) => {
    setSingleProduct(product);
    onOpen();
  };

  const { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip={"text"}
          mb={"100"}
        >
          Current Products
        </Text>
        {products.length ? (
          <SimpleGrid
            columns={{ base: "1", md: "2", lg: "3" }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard
                handleEditClick={handleEditClick}
                key={product._id}
                product={product}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.500"}
            textAlign={"center"}
          >
            No Products Found 😥{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create A Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
      <UpdateProductModal
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        singleProduct={singleProduct}
      />
    </Container>
  );
};

export default HomePage;
