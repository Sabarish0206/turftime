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

export const getUser = async(id) =>{
    console.log("From apihelpers Id:",id)
    const res = await axios.get(`/user/${id}`)
        .catch(err=>console.log(err));

    if(res){
        console.log("response from apiHelper:",res);
    }

    const resData = await res.data;
    console.log("UserByid:",resData);

    // const turf = await axios.get(`/user/${res.data.booking[0]}`)



    return resData;
}

export const createTurf = async (turfName,description,location,price,games,posterUrl,featured,slots) => {
    let res
    try {
        res = await axios.post('/turf', {
            turfName,
            description,
            location,
            price,
            games,
            posterUrl,
            featured,
            slots
        },
    {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
      console.log('Turf created:', response.data);
    } catch (error) {
        console.error('Error creating turf:', error);
    }

    const resData = await res.data;
    return resData;
};