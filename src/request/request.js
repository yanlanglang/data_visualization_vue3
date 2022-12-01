import axios from "axios";
import qs from "qs";

// axios.defaults.baseURL = ''  //正式
//axios.defaults.baseURL = "http://localhost:3000"; //测试
axios.defaults.baseURL = "backend/";

//post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
//允许跨域携带cookie信息
axios.defaults.withCredentials = true;
//设置超时
axios.defaults.timeout = 15000;

//请求拦截
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      //直接返回想要的data
      return Promise.resolve(response.data);
    } else {
      return Promise.resolve(response);
    }
  },
  (error) => {
    alert(JSON.stringify(error), "请求异常", {
      confirmButtonText: "确定",
      callback: (action) => {
        console.log(action);
      },
    });
  }
);

export default axios;
