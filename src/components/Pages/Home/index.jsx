import React from 'react'
import CardView from './../../CardView/index';
import Container from '@mui/material/Container';
import { products } from './../../../atoms';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import ImageList from '@material-ui/core/ImageList'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  card: {
    maxWidth: 160,
    height: "100%"
  }
}));

export const Home = () => {
  const productList = useRecoilValue(products);
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <h1> Grab the best deals</h1>
      <ImageList rowHeight={"auto"} className={classes.gridList} gap={0}>
        {productList.map((item) =>
          <CardView
            key={item.productId}
            item={item}
          />
        )}
      </ImageList>
    </Container >
  )
}
