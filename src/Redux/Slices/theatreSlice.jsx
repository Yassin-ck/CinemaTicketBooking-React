import { createSlice } from '@reduxjs/toolkit'




  const theatreSlice = createSlice({
    name:"theatre",
    initialState:{
        theatreList:[]
    },
    reducers:{
      theareListingAction:(state,action)=>{
            return {
                ...state,
                    theatreList:action.payload
            }
        }

    }
  })

export const {theareListingAction} = theatreSlice.actions;
export default theatreSlice.reducer