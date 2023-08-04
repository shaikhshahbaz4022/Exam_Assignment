import { INSTRUCTOR_FAILURE, INSTRUCTOR_REQUEST, INSTRUCTOR_SUCCESS } from "./actionType"


const initState = {
    userDetail: [],
    isLoading: false,
    isError: false
}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case INSTRUCTOR_REQUEST: return { ...state, isLoading: true }
        case INSTRUCTOR_SUCCESS: return { ...state, isLoading: false, userDetail: payload }
        case INSTRUCTOR_FAILURE: return { ...state, isLoading: false, isError: true }
        default: return { ...state }
    }
}