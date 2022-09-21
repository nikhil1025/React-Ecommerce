import { useMutation } from 'react-query';
import axios from 'axios';

export const getCall = (route) => axios.get(route);

export const useGet = (route) => useMutation("GET_API", () => getCall(route));

export const postCall = (route, data) => axios.post(route, data);

export const usePost = (route, data) => useMutation("POST_API", () => postCall(route, data));

export const patchCall = (route, data) => axios.patch(route);

export const usePatch = (route, data) => useMutation("PATCH_API", () => patchCall(route, data));

export const deleteCall = (route) => axios.delete(route);

export const useDelete = (route) => useMutation("DELETE_API", () => deleteCall(route));