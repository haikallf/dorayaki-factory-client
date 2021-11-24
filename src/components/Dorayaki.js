import React, { useState, useEffect } from "react";
import "./Dorayaki.css";
import axios from "axios";
import { url } from "../globalconfig";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Dorayaki() {
  const [rows, setRows] = useState([]);
  const [namaDorayaki, setNamaDorayaki] = useState("");
  const history = useHistory();

  // useEffect(() => {
  //   axios.get(url + "/login").then((response) => {
  //     if (response.data.loggedIn == true) {
  //     } else {
  //       alert("Anda harus login untuk mengakses halaman ini!");
  //       history.push("/login");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    getDorayaki();
  }, [rows]);

  const getDorayaki = async () => {
    const response = await axios.post(
      url + "/dorayaki",
      { withCredentials: true },
      {
        headers: {
          "Authorization": sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.error) {
      console.log(response);
      alert(response.data.error);
      history.push("/login");
    } else {
      setRows(response.data);
    }
  };

  // const getDorayaki = async () => {
  //   const response = await axios.get(url + "/dorayaki");
  //   setRows(response.data);
  // };

  const tambahDorayaki = () => {
    if (namaDorayaki == null || namaDorayaki == "") {
      alert("Nama bahan tidak boleh kosong");
    } else {
      axios.post(url + "/tambahdorayaki", {
        namaDorayaki: namaDorayaki,
      });
      handleClose();
    }
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  //  MUI
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // DIALOG
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="dorayaki">
      <div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "rgb(0, 180, 255)",
            marginLeft: "70px",
            marginTop: "30px",
          }}
          onClick={handleClickOpen}
        >
          Tambah Dorayaki
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Tambah Dorayaki</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Masukkan nama dorayaki yang diinginkan
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nama Dorayaki"
              type="text"
              fullWidth
              variant="standard"
              value={namaDorayaki}
              onChange={(e) => {
                setNamaDorayaki(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={tambahDorayaki}>Tambah</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="dorayaki__form">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Dorayaki</TableCell>
                <TableCell align="center">Nama Dorayaki</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.idItem}</TableCell>
                    <TableCell align="center">{row.nama}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default Dorayaki;
