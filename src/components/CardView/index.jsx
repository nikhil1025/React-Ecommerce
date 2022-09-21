import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { usePost } from "./../../ApiServices.js";
import { useEffect } from 'react';

export default function CardView(props) {
  const { mutate: addItemToCart, data, isSuccess } = usePost("http://localhost:8000/cart");

  const addCartItem = (e) => {
    e.preventDefault();

    let itemObjString = JSON.stringify(props.item);
    let itemObj = JSON.parse(itemObjString);
    itemObj["quantity"] = 1;
    console.log(itemObj);
    addItemToCart(itemObj);
  };


  useEffect(() => {
    if (isSuccess instanceof Error) {
      alert("Added to cart Successfully");
    }
  }, [isSuccess]);


  return (
    <Card style={{ border: '1px solid black', margin: "48px", borderRadius: 0 }} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.item.img}
        alt={props.item.brandName}
      />
      <CardContent>
        <Typography gutterBottom variant="div" component="div">
          {props.item.name}  <h6 className="d-block">{" by " + props.item.sellerName}</h6>
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">&#x2022;
          {props.item.category}
          {props.item.isNewProduct ?
            <Chip
              style={{ borderRadius: 0, marginLeft: 10, outline: "1px solid red", outlineOffset: "2px" }}
              size="small"
              label={"Newly Arrived"}
              color="error" /> : ""}
        </Typography>
      </CardContent>

      <div className="container-fluid">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <h5 className="">
            Price : &#8377; {props.item.price}
            {props.item.discount !== "" ?
              <Chip
                style={{ borderRadius: 0, padding: 0 }}
                className="mx-3"
                label={"- discount " + props.item.discount}
                color="warning" /> : ""}
          </h5>
        </div>
      </div>
      <div className="container-fluid">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div className="w-100 d-flex flex-row align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <span>Rating : <b>{props.item.rating}</b> &nbsp;</span><Rating
                name="simple-controlled"
                readOnly
                value={parseInt(props.item.rating)}
                onChange={(event, newValue) => { }}
              />
            </div>
          </div>
          <div className="w-100 d-flex flex-row align-items-center justify-content-center">
            {props.item.companyAssured ? <span className="text-muted">Assured <DoneAllIcon className="text-success" /></span> : ""}
          </div>
        </div>
      </div>
      <CardActions className="w-100">
        <div className="container-fluid">
          <div className="row">
            <Link
              className="col-6 d-flex flex-row align-items-center justify-content-center w-50 p-2"
              style={{ border: '1px solid black', borderRadius: 0, textDecoration: "none" }} to={"/item/" + props.item.productId} >BUY</Link>
            <Button
              className="col-6 d-flex flex-row align-items-center justify-content-center w-50 p-2"
              style={{ border: '1px solid black', borderRadius: 0, textDecoration: "none" }} onClick={addCartItem} >ADD TO CART</Button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
