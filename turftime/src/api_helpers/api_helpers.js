import axios from "axios";

export const getAllTurfs = async()=>{
    const res = await axios.get("/turf")
    .catch(err=>console.log(err));

    if(res){
        console.log("response:",res);
    }

    const resData = await res.data;
    console.log("data:",resData);
    return resData;
}

export const sendUserAuthRequest = async (data,signUp) =>{
    const res = await axios.post(`/user/${signUp ? "signup" : "login"}`,{
        name:signUp ? data.name : "",
        email:data.email,
        password:data.password}
    ).catch((err)=>console.log(err));

    if(!res){
        console.log("Error");
    }

    const resData = await res.data;
    console.log("post:",res);
    return resData;



}

export const sendAdminAuthRequest = async (data,signUp) =>{
    const res = await axios.post("/admin/login",{
        email:data.email,
        password:data.password}
    ).catch((err)=>console.log(err));

    if(!res){
        console.log("Error");
    }

    const resData = await res.data;
    console.log("post:",resData);
    return resData;
}