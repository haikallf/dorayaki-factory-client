import React, { useEffect, useState } from "react";
import "./EditBahan.css";
import axios from "axios";
import { url } from "../globalconfig";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

function EditBahan() {
  const [namaBahan, setNamaBahan] = useState("Nama bahan");
  const [stokBahan, setStokBahan] = useState(0);
  const history = useHistory();
  const { id } = useParams();

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

  useEffect(() => {
    getBahanById();
  }, []);

  const getBahanById = async () => {
    const response = await axios.get(url + `/getbahan/${id}`);
    setNamaBahan(response.data[0].namaBahan);
    setStokBahan(response.data[0].stokBahan);
    console.log(stokBahan);
    console.log(namaBahan);
  };

  const updateBahan = (id) => {
    if (namaBahan == null || namaBahan == "") {
      alert("Nama bahan tidak boleh kosong");
    } else {
      axios.put(url + `/bahan/${id}/edit`, {
        namaBahan: namaBahan,
        stokBahan: stokBahan,
      });
      history.goBack();
    }
  };

  return (
    <div className="editbahan">
      <div className="editbahan__form">
        <h1>Edit Bahan</h1>
        <div className="editbahan__inner">
          <div className="editbahan__left">
            <p>Nama Bahan</p>
            <p>Stok Bahan</p>
          </div>
          <div className="editbahan__right">
            <input
              type="text"
              name="namaBahan"
              value={namaBahan}
              onChange={(e) => {
                setNamaBahan(e.target.value);
              }}
            />
            <input
              type="number"
              name="stokBahan"
              required="required"
              value={stokBahan}
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
          onClick={() => updateBahan(id)}
        >
          Edit Bahan
        </Button>
      </div>
    </div>
  );
}

export default EditBahan;
