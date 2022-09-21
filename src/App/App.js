import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState } from 'recoil';
import RecoilNexus from "recoil-nexus";
import { Home } from './../components/Pages/Home/index';
import { Preview } from './../components/Pages/Preview/index';
import Cart from './../components/Pages/Cart/index';
import { Product } from './../components/Pages/Product/index';
import Navbar from './../components/Navbar/index';

import { useGet } from '../ApiServices';

import { products, cart } from '../atoms';


function App() {

  const [, setProductList] = useRecoilState(products);
  const [, setCartList] = useRecoilState(cart);

  const { mutate: getProducts, data: productData, error: productError } = useGet("/products");
  const { mutate: getCart, data: cartdata, error: cartError } = useGet("/cart");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (productData) {
      setProductList(productData?.data);
    }
  }, [productData]);


  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cartdata) {
      setCartList(cartdata?.data);
    }
  }, [cartdata]);


  useEffect(() => {
    if (productError instanceof Error) {
      console.log(productError);
      setProductList(productError);
    }
  }, [productError]);

  useEffect(() => {
    if (cartError instanceof Error) {
      console.log(cartError);
      setCartList(cartError);
    }
  }, [cartError]);

  return (
    <div className="App">
      <RecoilNexus />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
