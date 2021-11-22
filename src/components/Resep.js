import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../urlconfig";

function Resep() {
  const [resep, setResep] = useState([]);

  useEffect(() => {
    getResep();
  }, []);

  const getResep = async () => {
    const response = await axios.get(url + "/resep");
    console.log(response.data);
    setResep(response.data);
  };

  return (
    <div className="resep">
      <table>
        <thead>
          <tr>
            <th>ID Item</th>
            <th>ID Bahan</th>
            <th>Jumlah Bahan</th>
          </tr>
        </thead>
        <tbody>
          {resep.map((item) => (
            <tr>
              <td>{item.idItem}</td>
              <td>{item.idBahan}</td>
              <td>{item.jumlahBahan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Resep;
