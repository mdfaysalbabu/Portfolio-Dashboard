import { FieldValues } from "react-hook-form"
import setAccessToken from "./setAccessToken";
import { getUserInfo } from "../auth.service";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/types";

export const loginUser = async (data: FieldValues) => {
    const res = await fetch('https://portfolio-backend-two-snowy.vercel.app/api/v1/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials:"include"
    })
    const userData = await res.json();
    console.log(userData);
    if(userData?.data?.accessToken){
        const decode=jwtDecode(userData?.data?.accessToken) as TUser
        setAccessToken(userData?.data?.accessToken,{
            redirect:`/dashboard/${decode?.role.toLowerCase()}`
        })
    }
    return userData;
}