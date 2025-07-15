import {
  Box,
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const UpdateProductModal = ({ singleProduct, isOpen, onClose }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (singleProduct) {
      setProductData({
        name: singleProduct?.name || "",
        price: singleProduct?.price || "",
        image: singleProduct?.image || "",
      });
    }
  }, [singleProduct]);
  const toast = useToast();
  const { updateProduct } = useProductStore();
  const handleProductUpdate = async (id) => {
    const { success, message } = await updateProduct(id, productData);

    if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    onClose();
  };
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container maxW={"container.sm"}>
            <VStack spacing={8}>
              <Box
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                p={6}
                rounded={"lg"}
                shadow={"md"}
              >
                <VStack spacing={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={productData.name}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Product Price"
                    name="price"
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Product Image"
                    name="image"
                    value={productData.image}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Box>
            </VStack>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => handleProductUpdate(singleProduct._id)}
            variant="solid"
            bg={"red.500"}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProductModal;
