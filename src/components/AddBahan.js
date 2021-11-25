import React, { useEffect, useState } from "react";
import "./AddBahan.css";
import axios from "axios";
import { url } from "../globalconfig";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddBahan() {
  const [namaBahan, setNamaBahan] = useState(null);
  const [stokBahan, setStokBahan] = useState(0);
  const history = useHistory();

  useEffect(() => {
    authTest();
  }, []);

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

  const getNamaBahanById = async (id) => {
    const response = await axios.get(url + `/getbahan/${id}`);
    return response.data[0].namaBahan;
  };

  // useEffect(() => {
  //   getBahanById(1);
  // }, []);

  const tambahBahan = () => {
    if (namaBahan == null || namaBahan == "") {
      alert("Nama bahan tidak boleh kosong");
    } else {
      axios.post(url + "/tambahbahan", {
        namaBahan: capitalizeFirstLetter(namaBahan),
        stokBahan: stokBahan,
      });
      history.goBack();
    }
  };

  return (
    <div className="addbahan">
      <div className="addbahan__form">
        <h1>Tambah Bahan</h1>
        <div className="addbahan__inner">
          <div className="addbahan__left">
            <p>Nama Bahan</p>
            <p>Stok Bahan</p>
          </div>
          <div className="addbahan__right">
            <input
              type="text"
              name="namaBahan"
              placeholder="Nama Bahan"
              onChange={(e) => {
                setNamaBahan(e.target.value);
              }}
            />
            <input
              type="number"
              name="stokBahan"
              placeholder="0"
              required="required"
              onChange={(e) => {
                setStokBahan(e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "rgb(0, 180, 255)",
            // fontFamily: "font-family: 'Poppins', sans-serif;",
            // color: "rgb(172, 4, 4)",
          }}
          onClick={tambahBahan}
        >
          Tambah Bahan
        </Button>
      </div>
    </div>
  );
}

export default AddBahan;
