import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  pastes : localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))  
    : [] ,
  //it is an array of content
}

// const initialState = {
//   pastes: (() => {
//     const storedPastes = localStorage.getItem("pastes");
//     console.log("Stored pastes from localStorage:", storedPastes); // Log the retrieved data
//     try {
//       return storedPastes ? JSON.parse(storedPastes) : [];
//     } catch (error) {
//       console.error("Error parsing localStorage data:", error);
//       localStorage.removeItem("pastes"); // Clear invalid data
//       return []; // Fallback to an empty array
//     }
//   })(),
// };

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes : (state,action) => {
      const paste = action.payload;

      state.pastes.push(paste); //UPDATED IN CENTRALISED STORE
      localStorage.setItem("pastes" , JSON.stringify(state.pastes));

      toast("Paste Created Sucessfully !");

    },
    updateToPastes: (state ,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex( (item)=> item._id === paste._id );

      //if it exists then index is >=0 or else is -1
      if(index>=0)
      {
        state.pastes[index] = paste;
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));

        toast("Paste Updated Succesfully");
      }

    },
    resetAllPastes: (state, action) => {
      
      state.pastes = [];
      localStorage.removeItem("pastes");

    },
    removeFromPastes : (state,action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex( (item)=> item._id === pasteId ) 

      if(index >=0)
      {
        state.pastes.splice(index,1);
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));
        toast("Succefully Deleted the Note")
      }  
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes , updateToPastes , resetAllPastes , removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer