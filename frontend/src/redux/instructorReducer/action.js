import axios from "axios"
import { INSTRUCTOR_FAILURE, INSTRUCTOR_REQUEST, INSTRUCTOR_SUCCESS } from "./actionType"
const { token } = JSON.parse(localStorage.getItem("usersToken")) || ""

export const getUserDetails = () => (dispatch) => {
    dispatch({ type: INSTRUCTOR_REQUEST })
    axios.get(`${process.env.REACT_APP_URL}/exam/getallexam`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => { console.log(res); dispatch({ type: INSTRUCTOR_SUCCESS, payload: res.data }) }).then(e => dispatch({ type: INSTRUCTOR_FAILURE }))
}

