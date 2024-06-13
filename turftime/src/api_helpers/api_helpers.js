import axios from "axios";

export const getAllTurfs = async()=>{
    const res = await axios.get("http://localhost:5000/turf")
    .catch(err=>console.log(err));

    if(res){
        console.log("response:",res);
    }

    const data = await res.data;
    console.log("data:",data);
    return data;
}