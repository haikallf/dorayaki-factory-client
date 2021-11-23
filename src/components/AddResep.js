import React, { useState } from "react";
import "./AddResep.css";
import axios from "axios";
import { url } from "../globalconfig";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

function AddResep() {
  const [idItem, setIDItem] = useState(null);
  const [idBahan, setIDBahan] = useState(null);
  const [jumlahBahan, setJumlahBahan] = useState(0);
  const history = useHistory();

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
          <div className="addresep__left">
            <p>ID Item</p>
            <p>ID Bahan</p>
            <p>Jumlah Bahan</p>
          </div>
          <div className="addresep__right">
            <input
              type="number"
              name="idItem"
              required="required"
              placeholder="ID Item"
              onChange={(e) => {
                setIDItem(e.target.value);
              }}
            />
            <input
              type="number"
              name="ID Bahan"
              placeholder="0"
              required="required"
              onChange={(e) => {
                setIDBahan(e.target.value);
              }}
            />
            <input
              type="number"
              name="jumlahBahan"
              placeholder="0"
              required="required"
              onChange={(e) => {
                setJumlahBahan(e.target.value);
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
          onClick={tambahResep}
        >
          Tambah Resep
        </Button>
      </div>
    </div>
  );
}

export default AddResep;
