import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
var ajax = function (type,url,data,callback,errorback,beforeback,isLoading){
  //添加请求拦截器
  axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let localHost = window.location.host;
  if(window.location.port){
    // localHost=localHost.replace(':'+window.location.port,'')
    localHost=localHost.split(":")[0];
  }
  let URL = '//'+localHost+':4000/';






  let cancel ,promiseArr = {};
  const CancelToken = axios.CancelToken;


//请求拦截器
//   axios.interceptors.request.use(config => {
//     //发起请求时，取消掉当前正在进行的相同请求
//     if (promiseArr[config.url]) {
//       promiseArr[config.url]('操作取消')
//       promiseArr[config.url] = cancel
//     } else {
//       promiseArr[config.url] = cancel
//     }
//     return config
//   }, error => {
//     return Promise.reject(error)
//   });













  var  myInterceptor = axios.interceptors.request.use(config =>{
    // 在发送请求之前做某事，比如说 设置loading动画显示
    // if(isLoading ===1){
    //   axios.interceptors.request.eject(myInterceptor);
    // }
    if(beforeback&&Object.prototype.toString.call(beforeback)=== '[object Function]'){
      beforeback();
      axios.interceptors.request.eject(myInterceptor); //在before函数执行完毕后移除拦截器
    }
    return config
  }, error => {
    //请求错误时做些事
    return Promise.reject(error);
  });
  if(type === 'post'){
    axios({
      url: URL+url,
      method: 'post',
      data: qs.stringify(data),
      withCredentials: true,
      cancelToken: new CancelToken(c => {
        cancel = c
      }),
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        if(callback){
          callback(response.data);
        }
      })
      .catch(function (error){
        if (error.response) {
          if(error.response.status ===404 || error.response.status ===500){
            if(errorback&&Object.prototype.toString.call(errorback)=== '[object Function]'){
                if(error.response.data!=null&&error.response.data.length<100){
                    errorback(error.response.data)
                }else{
                    errorback("服务器响应错误！");
                }
            }
          }
          else {
            if(errorback && Object.prototype.toString.call(errorback) === '[object Function]'){
              errorback(error.response.data)
            }
          }
          if(error.response.data === "未登录") {
            window.location.href = "/"
          }
        }
      });
  }
  if(type === 'put' ||type ==='delete'){
    axios({
      // url: 'http://api.s9.local:1280/v1/'+url,
      // url: 'http://api.section9.avlsec.com/v1/'+url,
      url: URL+url,
      method: type,
      data: qs.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        if(callback){
          callback(response.data);
        }
      })
      .catch(function (error){
        if (error.response) {
          if(error.response.status ===404 || error.response.status ===500){
            if(errorback&&Object.prototype.toString.call(errorback)=== '[object Function]'){
              if(error.response.data!=null&&error.response.data.length<100){
                errorback(error.response.data)
              }else{
                errorback("服务器响应错误！")
              }
            }
          }
          else {
            if(errorback && Object.prototype.toString.call(errorback) === '[object Function]') {
              errorback(error.response.data)
            }
          }
          if(error.response.data === "未登录") {
            window.location.href = "/"
          }
        }
      });
  }
  if(type === 'get'){
    axios({
      // url: 'http://api.s9.local:1280/v1/'+url,
      // url: 'http://api.section9.avlsec.com/v1/'+url
      url: URL+url,
      method: 'get',
      // timeout: 1000,
      params: data,
      withCredentials: true,
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        if(callback){
          callback(response.data);
        }
      })
      .catch(function (error){
        if (error.response) {
          if(error.response.status ===404 || error.response.status ===500){
            if(errorback&&Object.prototype.toString.call(errorback)=== '[object Function]'){
              if(error.response.data!=null&&error.response.data.length<100){
                errorback(error.response.data)
              }else{
                errorback("服务器响应错误！")
              }
            }
          }
          else {
            if(errorback && Object.prototype.toString.call(errorback) === '[object Function]') {
              errorback(error.response.data)
            }
          }
          if(error.response.data === "未登录") {
            window.location.href = "/"
          }
        }
      });
  }
  if(type =='down'){
      window.location.href = URL + url;
      callback();
  }
}
export  {ajax} ;