import { createSlice } from "@reduxjs/toolkit";


 const movieSlice = createSlice({
    name:"movie",
    initialState:{
        movieList:[],
        movieListByLocation:[],
        loading:false,
        dateDetails:[],
        userLocation:''
    },

    reducers:{
        userLocation: (state, action) => {
        const storedUserLocation =JSON.parse(localStorage.getItem('myLocation'));
        if (storedUserLocation) {
          return {
            ...state,
            userLocation: storedUserLocation,
          }}
        return state;
      },
        movieListing:(state,action)=>{
            return{
                ...state,
                movieList:action.payload
            }
        },
        movieListingByLocation:(state,action)=>{
            return{
                ...state,
                loading:true,
                movieListByLocation:action.payload,
                
            }
        },dateListing:(state,action)=>{
            return {
                ...state,
                dateDetails:action.payload
            }
        }
    }

 })

 export const {movieListing,movieListingByLocation,dateListing,userLocation} = movieSlice.actions;
 export default movieSlice.reducer;