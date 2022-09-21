import { useMutation } from 'react-query';
import axios from 'axios';

export const getCall = (route) => axios.get(route);

export const useGet = (route) => useMutation("GET_API", () => getCall(route));

export const postCall = (route, data) => axios.post(route, data);

export const usePost = (route) => useMutation("POST_API", (data) => postCall(route, data));

export const patchCall = (route, data) => axios.patch(route, data);

export const usePatch = (route) => useMutation("PATCH_API", (data) => patchCall(route, data));

export const deleteCall = (route) => axios.delete(route);

export const useDelete = () => useMutation("DELETE_API", (route) => deleteCall(route));