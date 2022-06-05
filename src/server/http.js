import axios from 'axios'
import qs from "qs"
import Router from "@/router";


const TIME_OUT_MS = 60 * 1000 // 默认请求超时时间
axios.defaults.baseURL = 'http://testserver.hkkj.net';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem("access_token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = 'Bearer ' + localStorage.getItem("access_token");
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("response error :" + error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    Router.push("/login")
                    console.log("token 过期");
                    return;
            }
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    });


// function handleUrl (url) {
//     url = BASE_URL + url
//     return url
// }


/*
* @param data 参数列表
* @return
*/
function handleParams(data) {
    return qs.stringify(data);
}


export default {
    /*
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    post(url, data, response, exception) {
        axios({
            method: 'post',
            //url: handleUrl(url),
            url: url,
            // data: handleParams(data),
            data: data,
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': localStorage.getItem("access_token")
            }
        }).then(
            (result) => {
                response(result.data)
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    },
    postForm(url, data, response, exception) {
        axios({
            method: 'post',
            //url: handleUrl(url),
            url: url,
            data: handleParams(data),
            // data: data,
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': localStorage.getItem("access_token")
            }
        }).then(
            (result) => {
                response(result.data)
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    },
    /*
     * get 请求
     * @param url
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    get(url, data, response, exception) {
        axios({
            method: 'get',
            url: url,
            params: data,
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': localStorage.getItem("access_token")
            }
        }).then(
            (result) => {
                response(result.data)
            }
        ).catch(
            (error) => {
                console.log("error" + response);
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    }
}