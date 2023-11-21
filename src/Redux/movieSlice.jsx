import { createSlice } from "@reduxjs/toolkit";


 const movieSlice = createSlice({
    name:"movie",
    initialState:{
        movieList:[]
    },

    reducers:{
        movieListing:(state,action)=>{
            return{
                ...state,
                movieList:action.payload
            }
        }
    }

 })

 export const {movieListing} = movieSlice.actions;
 export default movieSlice.reducer;