import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './Slices/movieSlice'
import theatreReducer from './Slices/theatreSlice'

const store = configureStore({
    reducer:{
        movie:movieReducer,
        theatre:theatreReducer
    }
})


export default store;