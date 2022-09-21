import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cart } from '../../../atoms';
import { products } from './../../../atoms';
import Button from '@mui/material/Button';
import { useDelete } from "../../../ApiServices";
import { useEffect } from 'react';

export default function Cart() {

  const [rows, setRows] = useRecoilState(cart);
  const { mutate: deleteItemFromCart, data, error, isSuccess } = useDelete();

  const deleteCartItem = (id) => {
    deleteItemFromCart("/cart/" + id);
    console.log("cart/" + id)
  };

  useEffect(() => {
    if (error instanceof Error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      alert("Removed Item");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      setRows(rows?.filter(item => item.productId === data?.id))
    }
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button onClick={() => deleteCartItem(row.productId)}>&#10006;</Button>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{toString(row.quantity * parseInt(row.price))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
