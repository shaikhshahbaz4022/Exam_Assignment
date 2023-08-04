import axios from "axios"
import { INSTRUCTOR_FAILURE, INSTRUCTOR_REQUEST, INSTRUCTOR_SUCCESS, PATCH_INSTRUCTOR_SUCCESS } from "./actionType"
const { token } = JSON.parse(localStorage.getItem("usersToken")) || ""

export const getUserDetails = () => (dispatch) => {
    dispatch({ type: INSTRUCTOR_REQUEST })
    axios.get(`${process.env.REACT_APP_URL}/exam/getallexam`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => { console.log(res); dispatch({ type: INSTRUCTOR_SUCCESS, payload: res.data }) }).then(e => dispatch({ type: INSTRUCTOR_FAILURE }))
}

// export const patchUser=(id,index)=>(dispatch)=>{
//     dispatch({type:INSTRUCTOR_REQUEST});
//     fetch(`${process.env.REACT_APP_URL}/exam/checkpaper/${id}?index=${index}`,{
//         method:"PATCH",
//         headers:{
//             "Content-Type":"application/json",
//             Authorization:`Bearer ${token}`
//         },
//         body:JSON.stringify({payload:true})
//     }).then(res=>res.json()).then((res)=>{dispatch({type:PATCH_INSTRUCTOR_SUCCESS,payload:res.data})}).then(e=>dispatch({type:INSTRUCTOR_FAILURE}))
// }