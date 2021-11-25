import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Request.css";
import { url } from "../globalconfig";
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
import { useHistory } from "react-router-dom";

function Request() {
  const [request, setRequest] = useState([]);
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

  const acceptRequest = (id) => {
    const response = axios.post(url + `/acceptrequest`, {
      idRequest: id,
    });
    console.log(response);
    if (response.message) {
      alert("Penerimaan request gagal!");
    } else {
      axios.post(url + `/request/${id}/accept`);
    }
    return;
  };

  const declineRequest = (id) => {
    axios.post(url + `/request/${id}/decline`);
    return;
  };

  useEffect(() => {
    getRequest();
  }, [rows]);

  const getRequest = async () => {
    const response = await axios.get(url + "/request/pending");
    setRequest(response.data);
    setRows(response.data);
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

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

  return (
    <div className="request">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID Request</TableCell>
              <TableCell align="center">ID Item</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Waktu Request</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.idRequest}</TableCell>
                  <TableCell align="center">{row.idItem}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.timestamp}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      style={{
                        borderColor: "rgb(10, 153, 6)",
                        color: "rgb(10, 153, 6)",
                      }}
                      onClick={() => acceptRequest(row.idRequest)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        borderColor: "rgb(172, 4, 4)",
                        color: "rgb(172, 4, 4)",
                        marginLeft: "10px",
                      }}
                      onClick={() => declineRequest(row.idRequest)}
                    >
                      Decline
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
  );
}

export default Request;
