import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice'
import lectureSliceReducer from './Slices/LectureSlice.js'
import razorpaySliceReducer from './Slices/RazorpaySlice.js'
import statSliceReducer from './Slices/StateSlice.js'

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        course : courseSliceReducer,
        razorPay : razorpaySliceReducer,
        lecture : lectureSliceReducer,
        stats : statSliceReducer

    },
    devTools : true
})

export default store