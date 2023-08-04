import axios from "axios"
import { GET_USER_SUCCESS, USER_FAILURE, USER_REQUEST } from "./actionType";

const {token}=JSON.parse(localStorage.getItem("usersToken")) || ""


export const getUserQues=()=>(dispatch)=>{
    dispatch({type:USER_REQUEST})
    axios.get(`${process.env.REACT_APP_URL}/exam/userquestion`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{console.log("resUser",res);dispatch({type:GET_USER_SUCCESS,payload:res.data})}).then(e=>dispatch({type:USER_FAILURE}))
}