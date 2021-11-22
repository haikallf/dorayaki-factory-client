import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../urlconfig";

function Request() {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = async () => {
    const response = await axios.get(url + "/request");
    setRequest(response.data);
  };

  return (
    <div className="requests">
      <table>
        <thead>
          <tr>
            <th>ID Item</th>
            <th>ID Request</th>
            <th>IP Address</th>
            <th>Username</th>
            <th>Quantity</th>
            <th>Waktu Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {request.map((item) => (
            <tr>
              <td>{item.idItem}</td>
              <td>{item.idRequest}</td>
              <td>{item.ip}</td>
              <td>{item.username}</td>
              <td>{item.quantity}</td>
              <td>{item.timestamp}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Request;
