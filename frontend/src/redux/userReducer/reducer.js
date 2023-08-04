import { GET_USER_SUCCESS, USER_FAILURE, USER_REQUEST } from "./actionType"

const initState={
    userQuestion:[],
    isLoading:false,
    isError:false
}

export const reducer=(state=initState,{type,payload})=>{

    switch(type){
        case USER_REQUEST:return {...state,isLoading:true};
        case USER_FAILURE:return {...state,isLoading:false,isError:true}
        case GET_USER_SUCCESS:return {...state,isLoading:false,userQuestion:payload}
        default: return {...state}
    }
}