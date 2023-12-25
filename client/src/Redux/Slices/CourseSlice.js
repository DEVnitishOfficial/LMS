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

export const deleteCourses = createAsyncThunk("/course/delete",async (id) => {
    try{
        const response = axiosInstance.delete(`/courses/${id}`)
        console.log('response',response)
        toast.promise(response,{
            loading : "Wait!! deleting the course",
            success : "Course deleted successfully",
            error : "failed to delete courses"
        })
        return (await response).data
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

export  const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData()
        formData.append('title',data?.title)
        formData.append('description',data?.description)
        formData.append('category',data?.category)
        formData.append('thumbnail',data?.thumbnail)
        formData.append('createdBy',data?.createdBy)

        const response = axiosInstance.post("/courses",formData)
        toast.promise(response,{
            loading : 'Wait, creating new course',
            success : 'Successfully created your new course',
            error : ' Failed to create new course '
        })

        return (await response).data
        
    } catch (error) {
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