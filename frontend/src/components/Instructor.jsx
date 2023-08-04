import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  Select,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, patchUser } from "../redux/instructorReducer/action";
import axios from "axios";

const Instructor = () => {
  const user = JSON.parse(localStorage.getItem("usersToken")) || "";
  const store = useSelector((store) => store.instructoreReducer.userDetail);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addData, setAddData] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dataQues = useRef([]);
  const [singleName, setSingleName] = useState([]);
  const [singleId, setSingleId] = useState("");

  const handleChange = (e) => {
    setAddData(e.target.value);
  };

  const handleClick = () => {
    if (addData.trim() !== "") {
      const newQuestion = { question: addData }; // Create an object from addData
      dataQues.current.push(newQuestion); // Push the object into the dataQues.current array
      setAddData(""); // Clear the input field
      console.log(dataQues.current);
    }
  };
  const handleSubmit = () => {
    console.log(dataQues);
    let start = new Date(startDate);
    start = start.toISOString();

    let end = new Date(endDate);
    end = end.toISOString();

    const obj = {
      title,
      startTime: start,
      endTime: end,
      questions: dataQues.current,
      assignedTo: singleId,
    };
    console.log(obj);
    fetch(`${process.env.REACT_APP_URL}/exam/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Questions Added Successfully");
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/exam/allusers`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setSingleName(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleToggle = (examID, questionIndex, answerIndex) => {
    console.log(examID, questionIndex, answerIndex);
    fetch(
      `${process.env.REACT_APP_URL}/exam/checkpaper/${examID}?index=${answerIndex}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ payload: true }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Box>
      <Flex gap={"5vh"} direction={{ md: "row", base: "column" }}>
        <Box>
          <Button onClick={onOpen}>Create Questions</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Questions</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex align={"center"} gap={"2vh"}>
                  <Text>Title</Text>
                  <Input
                    placeholder="Enter Title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Flex>
                <Flex align={"center"} gap={"2vh"}>
                  <Text>Question</Text>
                  <Input
                    placeholder="Enter Question"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Flex>
                <Flex align={"center"} gap="1vh">
                  <label>Assign</label>
                  <Select onChange={(e) => setSingleId(e.target.value)}>
                    {singleName?.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                </Flex>
                <Flex align={"center"} gap={"2vh"}>
                  <Text>Start Date</Text>
                  <Input
                    placeholder="Enter "
                    type="datetime-local"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Flex>
                <Flex align={"center"} gap={"2vh"}>
                  <Text>End Date</Text>
                  <Input
                    placeholder="Enter "
                    type="datetime-local"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleClick}>
                  Add
                </Button>
                <Button variant="ghost" onClick={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", base: "repeat(1,1fr)" }}
          gap={"5vh"}
        >
          {store?.map((item, i) => {
            return (
              <Box key={i} border={"1px solid gray"} p={"2vh"}>
                <Flex gap={"2vh"}>
                  <Text>Start: {item.startTime}</Text>
                  <Text>End: {item.endTime}</Text>
                </Flex>
                <Text>Title: {item.title}</Text>
                <Text>Status: {item.status}</Text>
                {item?.questions.map((question, j) => {
                  return (
                    <Box key={question._id}>
                      <Text>
                        {" "}
                        Q{j + 1}
                        {". "}
                        {question.question}
                      </Text>
                      <Text>
                        Ans{j + 1}
                        {". "}
                        {question?.answer}
                      </Text>
                      <Button onClick={() => handleToggle(item._id, i, j)}>
                        Checked
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Grid>
        <Button
          onClick={() => {
            localStorage.removeItem("usersToken");
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Instructor;
