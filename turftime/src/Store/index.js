import {configureStore, createSlice} from '@reduxjs/toolkit';

const userSclice = createSlice({
    name:"user",
    initialState:{
        isLogedIn :false,
    },
    reducers:{
        login(state,action){
            console.log('login action payload:', action.payload);
            state.isLogedIn=true;
            // state.name=action.payload.name;
            // state.userId=action.payload.id;
        },
        logout(state,action){
            state.isLogedIn=false;
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
        logout(state,isLogedIn){
            state.isLogedIn=false;
        },
    }
})

export const userActions=  userSclice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
    devTools:true,
    reducer:{
        user:userSclice.reducer,
        admin:adminSlice.reducer,
    }
})