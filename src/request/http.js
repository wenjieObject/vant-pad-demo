// 在http.js中引入axios
//http.js文件用来封装我们的axios

import axios from 'axios';
import QS from 'qs';
import { Toast } from 'vant';
import router from '../router'
import store from '../store'

// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'http://localhost:20472/';
// }
// else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'http://localhost:20472/';
// }
// else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://localhost:20472/';
// }

//默认的根路径
axios.defaults.baseURL = '/api'
//设置响应请求头
//axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.timeout = 10000;


// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
    })

// 响应拦截器
axios.interceptors.response.use(    
    response => {        
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {        
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:                    
                    router.replace({                        
                        path: '/',                        
                        query: { redirect: router.currentRoute.fullPath } 
                    });
                    break;
                // 403 token过期                
                // 登录过期对用户进行提示                
                // 清除本地token和清空vuex中token对象                
                // 跳转登录页面                
                case 403:                     
                    Toast({                        
                        message: '登录过期，请重新登录',                        
                        duration: 1000,                        
                        forbidClick: true                    
                    });                    
                    // 清除token                    
                    localStorage.removeItem('token');                    
                    //store.commit('loginSuccess', null);                    
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 
                // 404请求不存在                
                case 404:                    
                    Toast({                        
                        message: '网络请求不存在',                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });                    
                break;                
                // 其他错误，直接抛出错误提示                
                default:                    
                    Toast({                        
                        message: error.response.data.message,                        
                        duration: 1500,                        
                        forbidClick: true                    
                    });            
            }            
            return Promise.reject(error.response);        
        }       
    }
);


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function gets(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
     
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/** 
 * post方法，对应post请求 ,用于c# webapi的post请求
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function mesPost(url, params) {
     
    var config={
        headers :{"Content-Type": "application/x-www-form-urlencoded" }

    };

    return new Promise((resolve, reject) => {
        axios.post(url,  QS.stringify(params),config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

//这里有个小细节说下，axios.get()方法和axios.post()在提交数据时参数的书写方式还是有区别的。
//区别就是，get的第二个参数是一个{}，然后这个对象的params属性值是一个参数对象的。而post的第二个参数就是一个参数对象。