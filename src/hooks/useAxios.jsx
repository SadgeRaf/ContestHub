import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const { user } = use(AuthContext);

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
      if (user) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
      return response;
    }, (error)=>{
      return Promise.reject(error);
    })

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    }

  }, [user])



  return axiosSecure;
};

export default useAxios;
