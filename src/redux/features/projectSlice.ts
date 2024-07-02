
import {  createSlice } from '@reduxjs/toolkit'

type TItemState={
    techStack:string[] | [];
}
const initialState:TItemState={
    techStack:[]
    
}
export const projectSlice=createSlice({
    name:'addTechnology',
    initialState,
    reducers:{
        addTechStack: (state, action) => {
            const values = action.payload;
           state.techStack=values;
        },

    }
})

export const {addTechStack}=projectSlice.actions;
export default projectSlice.reducer;