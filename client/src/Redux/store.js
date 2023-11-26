import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice'

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        course : courseSliceReducer
    },
    devTools : true
})

export default store