import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Button,
  Collapse,
  useDisclosure,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
const Admin = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("usersToken")) || "";
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/admin/getalldata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box>
      <Flex align="center" p={4}>
        <Box>
          <Box fontSize="xl">Admin</Box>
        </Box>
        <Spacer />
        <Box display={{ base: "none", md: "block" }}>
          <Link to={"/register"}>
            <Button colorScheme="teal" mr={4}>
              Create
            </Button>
          </Link>

          <Button colorScheme="teal" mr={4}>
            Validate Marks
          </Button>
          <Button colorScheme="teal" mr={4}>
            Generate ScoreSheet
          </Button>
          <Button colorScheme="teal" onClick={() => setCheck(!check)} mr={4}>
            All Users/Instructors
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("usersToken");
              window.location.reload();
            }}
            colorScheme="teal"
          >
            Logout
          </Button>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            aria-label="Open menu"
            onClick={onToggle}
          />
          <Collapse in={isOpen} animateOpacity>
            <Box mt={2}>
              <Link to={"/register"}>
                <Button colorScheme="teal" mr={4}>
                  Create
                </Button>
              </Link>

              <Button colorScheme="teal" mr={4}>
                Validate Marks
              </Button>
              <Button colorScheme="teal" mr={4}>
                Generate ScoreSheet
              </Button>
              <Button colorScheme="teal" onClick={() => setCheck(!check)}>
                All Users/Instructors
              </Button>
              <Button onClick={() => localStorage.removeItem("usersToken")}>
                Logout
              </Button>
            </Box>
          </Collapse>
        </Box>
      </Flex>
      <Grid templateColumns={"repeat(3,1fr)"} gap={"2vh"}>
        {check &&
          data?.map((item, i) => {
            return (
              <Box key={item._id} border="1px solid gray" p={"2vh"}>
                <Heading>Role: {item.role}</Heading>
                <Heading>Name: {item.name}</Heading>
                <Text>Email: {item.email}</Text>
              </Box>
            );
          })}
      </Grid>
    </Box>
  );
};

export default Admin;
