import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Bahan.css";
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

function Bahan() {
  const [bahan, setBahan] = useState([]);
  const [rows, setRows] = useState([]);
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
    getBahan();
  }, [rows]);

  const getBahan = async () => {
    const response = await axios.get(url + "/bahan");
    setBahan(response.data);
    setRows(response.data);
  };

  const goToEditPage = (id) => {
    history.push(`/editbahan/${id}`);
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
    <div className="bahan">
      <Button
        variant="contained"
        style={{
          backgroundColor: "rgb(0, 180, 255)",
          marginLeft: "70px",
          marginTop: "30px",
        }}
        onClick={() => history.push("/addbahan")}
      >
        Tambah Bahan
      </Button>
      <div className="bahan__form">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID Item</TableCell>
                <TableCell align="center">Nama Bahan</TableCell>
                <TableCell align="center">Stok Bahan</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.idBahan}</TableCell>
                    <TableCell align="center">{row.namaBahan}</TableCell>
                    <TableCell align="center">{row.stokBahan}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        style={{
                          borderColor: "rgb(10, 153, 6)",
                          color: "rgb(10, 153, 6)",
                        }}
                        onClick={() => goToEditPage(row.idBahan)}
                      >
                        Edit
                      </Button>
                    </TableCell>
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

export default Bahan;
