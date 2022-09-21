import { useMutation } from 'react-query';
import axios from 'axios';

// Json-server URL
const BASE_URL = "http://localhost:8000" || process.env.BASE_URL;

export const getCall = (route) => axios.get(BASE_URL + route);

export const useGet = (route) => useMutation("GET_API", () => getCall(route));

export const postCall = (route, data) => axios.post(BASE_URL + route, data);

export const usePost = (route) => useMutation("POST_API", (data) => postCall(route, data));

export const patchCall = (route, data) => axios.patch(BASE_URL + route, data);

export const usePatch = (route) => useMutation("PATCH_API", (data) => patchCall(route, data));

export const deleteCall = (route) => axios.delete(BASE_URL + route);

export const useDelete = () => useMutation("DELETE_API", (route) => deleteCall(route));