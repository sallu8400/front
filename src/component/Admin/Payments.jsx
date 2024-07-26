import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import moment from "moment";

const Payments = () => {
  const [Payment, SetPayments] = useState([]);

  useEffect(() => {
    const req = async () => {
      const { data } = await axios.get("http://localhost:8080/payments");

      SetPayments(data.items);
      console.log(Payment);
    };
    req();
  }, []);
  console.log(Payment);
  return (
    <Layout>
      <div className="ml-4 overflow-auto">
        <h1 className="font-bold py-3">Order</h1>
        <table className=" w-full mt-2">
          <thead>
            <tr className="bg-red-400 text-left">
              <th className=" px-4 py-4">Custmer Name</th>

              <th>OrderId</th>
              <th>Email</th>

              <th>Mobile</th>
              <th>payments</th>

              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Payment.map((item, index) => (
              <tr
                style={{
                  backgroundColor: (index + 1) % 2 == 0 ? "lightgray" : "white",
                }}
              >
                <div className="flex  items-center justify-start">
                  <img src="/images/1.jpg" className="h-10 w-10 rounded-full" />

                  <div
                    className="flex  flex-col 
                  "
                  >
                    <h1 className="font-bold ">
                      {item.notes.name ? item.notes.name : "Jhonde "}
                    </h1>
                    {/* <small>{item.Date}</small> */}
                  </div>
                </div>
                <td> {item.order_id}</td>
                <td className="p-4">{item.email}</td>
                <td>{item.contact}</td>
                <td> ₹{item.amount}</td>

                <td>
                  {moment
                    .unix(item.created_at)
                    .format("MMM DD YYYY hh:mm:ss p")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Payments;
