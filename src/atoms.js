import {atom} from 'recoil';

export const products = atom({
    key: 'products',
    default: []
});

export const cart = atom({
    key: 'cart',
    default: []
});