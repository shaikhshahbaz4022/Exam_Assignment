import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recent = () => {
  const { token } = JSON.parse(localStorage.getItem("usersToken")) || "";
  const [data, setData] = useState([]);
  let [score, setScore] = useState([]);
  console.log(score);

  function getScore(id) {
    console.log(id);
    fetch(`${process.env.REACT_APP_URL}/exam/countscore/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setScore(res);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/exam/recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log("data", data);
  return (
    <Box>
      <Link to="/" style={{ marginLeft: "2vh" }}>
        Home
      </Link>
      <Box>
        {" "}
        <Heading>Your Score is {score.count}</Heading>
      </Box>
      <Flex direction={"column"} border={"2px solid black"}>
        <Box>
          {data?.map((item, i) => {
            return (
              <Box key={i} border={"1px solid gray"} p={"2vh"}>
                <Flex gap={"2vh"}>
                  <Text>Start: {item.startTime}</Text>
                  <Text>End: {item.endTime}</Text>
                </Flex>
                <Text>Title: {item.title}</Text>
                <Text>Status: {item.status}</Text>
                {item?.questions.map((item, i) => {
                  return (
                    <Box key={item._id}>
                      <Text>
                        {" "}
                        Q{i + 1}
                        {". "}
                        {item.question}
                      </Text>
                      <Text>
                        Ans{i + 1}
                        {". "}
                        {item?.answer}
                      </Text>
                    </Box>
                  );
                })}
                <Button onClick={() => getScore(item._id)}>See Score</Button>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default memo(Recent);
