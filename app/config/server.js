import axios from "axios";

export const serverip = 'http://127.0.0.1:5555'

export const wrapEndpoint = (endpoint) => {
  return `${serverip}/${endpoint}`

  
}

export const endpoints = {
    scanImg: wrapEndpoint('scanimg'),
}

export const api = axios.create({
    baseURL: serverip,
    headers: {
        'Content-Type': 'application/json',
        'Accept':"*/*",
        'Access-Control-Allow-Origin': '*',
    }
   
});

export const headers =   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept':"*/*",
    'Access-Control-Allow-Origin': '*',
   }