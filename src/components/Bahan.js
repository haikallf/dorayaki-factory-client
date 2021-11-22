import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../urlconfig";

function Bahan() {
  const [bahan, setBahan] = useState([]);

  useEffect(() => {
    getBahan();
  }, []);

  const getBahan = async () => {
    const response = await axios.get(url + "/bahan");
    console.log(response.data);
    setBahan(response.data);
  };

  return (
    <div className="bahan">
      <table>
        <thead>
          <tr>
            <th>ID Item</th>
            <th>Nama Bahan</th>
            <th>Stok Bahan</th>
          </tr>
        </thead>
        <tbody>
          {bahan.map((item) => (
            <tr>
              <td>{item.idBahan}</td>
              <td>{item.namaBahan}</td>
              <td>{item.stokBahan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bahan;
