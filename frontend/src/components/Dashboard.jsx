import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserQues } from '../redux/userReducer/action'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  const store=useSelector(store=>store.userReducer.userQuestion)
  const title=useSelector(store=>store.userReducer.userQuestion)
  const ques=useRef([])
  const dispatch=useDispatch()
const [data,setData]=useState("")

const {token}=JSON.parse(localStorage.getItem("usersToken")) || ""

  useEffect(()=>{
   dispatch(getUserQues())
  },[])

  const handleClick=()=>{
    console.log(data);
    ques.current.push(data);
  }
  const handleSubmit=(id)=>{
   fetch(`${process.env.REACT_APP_URL}/exam/exams/${id}/submit`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({answer:ques.current})
   }).then(res=>res.json()).then((res)=>{alert(res.msg);window.location.reload()}).catch(e=>console.log(e))
  
     
  }

  return (
    <Flex gap={'10vh'}>
    <Box>
      <Flex gap={'2vh'}>
        <Link to="/recent">
        <Button>Recent Cleared</Button>
        </Link>
        <Link to={"/upcoming"}>
        <Button>Upcoming Exams</Button>
        </Link>
      </Flex>
    </Box>
      <Box   w='120vh' >
     {store?.map((item,i)=>{
       return <Box key={item._id} border={'1px solid gray'} p={'2vh'} mb={'2vh'}>
         <Heading color={'teal'}>Title: { item.title}</Heading>
       {item?.questions.map((el,i)=>{
         return <Box key={i}>
        <Text>{i+1}{"."}{el.question}</Text>
        <Flex gap={'2vh'}>
        <Input onChange={(e)=>setData(e.target.value)}/>
        <Button onClick={handleClick}>Click</Button>
        </Flex>
        </Box>
       })} 
       <Button onClick={()=>handleSubmit(item._id)}>Submit</Button>
    
      </Box>
     })}
      </Box>
      <Button onClick={()=>{localStorage.removeItem("usersToken");window.location.reload()}}>Logout</Button>
    </Flex>
  )
}

export default Dashboard
