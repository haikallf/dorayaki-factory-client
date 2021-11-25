import React, { useEffect, useState } from "react";
import "./AddResep.css";
import axios from "axios";
import { url } from "../globalconfig";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddResep() {
  const [idItem, setIDItem] = useState(null);
  const [idBahan, setIDBahan] = useState(null);
  const [jumlahBahan, setJumlahBahan] = useState(0);
  const [rows, setRows] = useState([]);
  const [bahan, setBahan] = useState([]);
  const [dorayaki, setDorayaki] = useState([]);
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    getResep();
  }, []);

  useEffect(() => {
    getBahan();
  }, []);

  useEffect(() => {
    getDorayaki();
  }, []);

  const getResep = async () => {
    const response = await axios.get(url + "/resep");
    console.log(response.data);
    setRows(response.data);
  };

  const getBahan = async () => {
    const response = await axios.get(url + "/bahan");
    console.log(response.data);
    setBahan(response.data);
  };

  const getDorayaki = async () => {
    const response = await axios.get(url + "/dorayaki");
    console.log(response.data);
    setDorayaki(response.data);
  };

  const handleChangeIDBahan = (event) => {
    setIDBahan(event.target.value);
  };

  const handleChangeIDItem = (event) => {
    setIDItem(event.target.value);
  };

  // const getNamaBahanById = (id) => {
  //   var response = axios.get(url + `/getbahan/${id}`);
  //   if (typeof response !== "undefined") {
  //     return "namaBahan";
  //   }
  //   return response?.data[0]?.namaBahan;
  // };

  const getNamaDorayakiById = (id) => {
    var _namaDorayaki = "";
    for (let i = 0; i < dorayaki.length; i++) {
      if (dorayaki[i].idItem == id) {
        _namaDorayaki = dorayaki[i].nama;
      }
    }
    return _namaDorayaki;
  };

  const getNamaBahanById = (id) => {
    var _namaBahan = "";
    for (let i = 0; i < bahan.length; i++) {
      if (bahan[i].idBahan == id) {
        _namaBahan = bahan[i].namaBahan;
      }
    }
    return _namaBahan;
  };

  const tambahResep = () => {
    if (idItem == null || idItem == "" || idBahan == null || idBahan == "") {
      alert("Tidak ada field yang boleh kosong!");
    } else {
      axios.post(url + "/tambahresep", {
        idItem: idItem,
        idBahan: idBahan,
        jumlahBahan: jumlahBahan,
      });
      history.goBack();
    }
  };

  return (
    <div className="addresep">
      <div className="addresep__form">
        <h1>Tambah Resep</h1>
        <div className="addresep__inner">
          {/* <div className="addresep__left">
            <p>ID Item</p>
            <p>Nama Bahan</p>
            <p>Jumlah Bahan</p>
          </div> */}
          <div className="addresep__right">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Dorayaki
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={idItem}
                onChange={handleChangeIDItem}
                label="Nama Dorayaki"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {dorayaki.map((row, index) => (
                  <MenuItem value={row.idItem}>
                    {getNamaDorayakiById(row.idItem)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Bahan
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={idBahan}
                onChange={handleChangeIDBahan}
                label="Nama Bahan"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {rows.map((row, index) => (
                  <MenuItem value={row.idBahan}>
                    {getNamaBahanById(row.idBahan)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              type="number"
              name="jumlahBahan"
              placeholder="Jumlah Bahan"
              required="required"
              onChange={(e) => {
                setJumlahBahan(e.target.value);
              }}
            />

            <div></div>
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "rgb(0, 180, 255)",
            marginTop: "40px",
          }}
          onClick={tambahResep}
        >
          Tambah Resep
        </Button>
      </div>
    </div>
  );
}

export default AddResep;
