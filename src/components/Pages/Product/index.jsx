import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import imgthing from "./../../../test/img/contemplative-reptile.jpg";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { products } from './../../../atoms';
import { useRecoilValue } from 'recoil';

export const Product = () => {

  const productList = useRecoilValue(products);

  const { id } = useParams();

  const productData = productList.filter(item => item.productId === id)[0];

  console.log(productData);
  return (
    <Container maxWidth={false}>
      <div className="row">
        <div className="col-md-6 p-5">
          <div className="product-img-tray">
            <img src={imgthing} alt="" width="720px" />
          </div>
        </div>
        <div className="col-md-6 p-5">
          <div className="product-details">
            <h3 className="text-muted">{productData.brandName}</h3>
            <h1 className="text-primary">{productData.name}</h1>
            <CardContent>
              <Typography variant="h5" component="h1" color="text.secondary">&#x2022;
                {productData.category}
                {productData.isNewProduct ?
                  <Chip
                    style={{ borderRadius: 0, marginLeft: 10, outline: "1px solid red", outlineOffset: "2px" }}
                    size="small"
                    label={"Newly Arrived"}
                    color="error" /> : ""}
              </Typography>
            </CardContent>
            <div className="container-fluid">
              <h5 className="">
                Price : &#8377; {productData.price}
                {productData.discount !== "" ?
                  <Chip
                    style={{ borderRadius: 0, padding: 0 }}
                    className="mx-3"
                    label={"- discount " + productData.discount}
                    color="warning" /> : ""}
              </h5>
            </div>
            <div className="container-fluid">
              <div className="d-flex flex-row align-items-center justify-content-start">
                <div className=" d-flex flex-row align-items-center">
                  Rating : <b>{productData.rating}</b> &nbsp;<Rating
                    name="simple-controlled"
                    readOnly
                    value={parseInt(productData.rating)}
                    onChange={(event, newValue) => { }}
                  /></div>
                <div className="px-4 d-flex flex-row align-items-center">
                  {productData.companyAssured ? <Chip color="success" className="text-light" label={<>Assured <DoneAllIcon className="text-light" /></>} /> : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="container py-4">
            <div className="row">
              <Link
                className="col-3 d-flex flex-row align-items-center justify-content-center p-2"
                style={{ border: '1px solid black', borderRadius: 0, textDecoration: "none" }} to="/" >&#128092; BUY</Link>
              <Link
                className="col-3 d-flex flex-row align-items-center justify-content-center p-2 mx-5"
                style={{ border: '1px solid black', borderRadius: 0, textDecoration: "none" }} to="/" >&#128722; ADD TO CART</Link>
            </div>
          </div>
        </div>

      </div>
    </Container>
  )
}
