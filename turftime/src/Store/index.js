import {configureStore, createSlice} from '@reduxjs/toolkit';

const userSclice = createSlice({
    name:"user",
    initialState:{
        isLogedIn :false,
    },
    reducers:{
        login(state,action){
            state.isLogedIn=true;
            // state.name=action.payload.name;
            // state.userId=action.payload.id;
        },
        logout(state,action){
            state.isLogedIn=false;
            localStorage.removeItem("userId")
        },
    },
})


const adminSlice = createSlice({
    name:"auth",
    initialState:{isLogedIn:false},
    reducers:{
        login(state,isLogedIn){
            state.isLogedIn=true;
        },
        logout(state){
            state.isLogedIn=false;
            localStorage.removeItem("adminId");
            localStorage.removeItem("token")
        },
    }
})

export const userActions=  userSclice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
    devTools:false,
    reducer:{
        user:userSclice.reducer,
        admin:adminSlice.reducer,
    }
})