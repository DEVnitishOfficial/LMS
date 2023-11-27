import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helper/axiosInstance"

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk("/course/get",async () => {
    try{
        const response = axiosInstance.get("/courses")
        console.log('response',response)
        toast.promise(response,{
            loading : "Wait!! Course data is loading",
            success : "Course loaded successfully",
            error : "failed to get courses"
        })
        return (await response).data.courses
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name : "courses",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action.payload){
                console.log('course list', action.payload)
                state.courseData = [...action.payload]
            }
        })
    }
})
export default courseSlice.reducer