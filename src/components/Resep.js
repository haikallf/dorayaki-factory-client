import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Resep.css";
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

function Resep() {
  const [resep, setResep] = useState([]);
  const [rows, setRows] = useState([]);
  const history = useHistory();

  useEffect(() => {
    authTest();
  }, [rows]);

  const authTest = async () => {
    const response = await axios.post(
      url + "/authtest",
      { withCredentials: true },
      {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.error) {
      console.log(response);
      alert("Anda harus login untuk melihat halaman ini!");
      history.push("/login");
    }
  };

  useEffect(() => {
    getResep();
  }, []);

  const getResep = async () => {
    const response = await axios.get(url + "/resep");
    console.log(response);
    setRows(response.data);
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className="resep">
      <Button
        variant="contained"
        style={{
          backgroundColor: "rgb(0, 180, 255)",
          marginLeft: "70px",
          marginTop: "30px",
        }}
        onClick={() => history.push("/addresep")}
      >
        Tambah Resep
      </Button>
      <div className="resep__form">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Item</TableCell>
                <TableCell align="center">ID Bahan</TableCell>
                <TableCell align="center">Jumlah Bahan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.idItem}</TableCell>
                    <TableCell align="center">{row.idBahan}</TableCell>
                    <TableCell align="center">{row.jumlahBahan}</TableCell>
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

export default Resep;
