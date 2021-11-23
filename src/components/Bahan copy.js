import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../globalconfig";
import { Link } from "react-router-dom";

function Bahan() {
  const [bahan, setBahan] = useState([]);

  useEffect(() => {
    getBahan();
  }, [bahan]);

  const getBahan = async () => {
    const response = await axios.get(url + "/bahan");
    console.log(response.data);
    setBahan(response.data);
  };

  return (
    <div className="bahan">
      <Link to="/addbahan">Tambah Bahan</Link>
      <table>
        <thead>
          <tr>
            <th>ID Item</th>
            <th>Nama Bahan</th>
            <th>Stok Bahan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bahan.map((item) => (
            <tr>
              <td>{item.idBahan}</td>
              <td>{item.namaBahan}</td>
              <td>{item.stokBahan}</td>
              <td>
                <Link to={`/editbahan/${item.idBahan}`}>Edit</Link>
                {/* <button>Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bahan;
