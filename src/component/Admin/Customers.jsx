import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import FirebasesApp from "../../firebase-config";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import moment from "moment";
const db = getFirestore(FirebasesApp);
const Customers = () => {
  const [customer, SetCustomer] = useState([]);

  useEffect(() => {
    const req = async () => {
      const data = await getDocs(collection(db, "customers"));
      let temp = [];
      data.forEach((doc) => {
        const item = doc.data();
        temp.push(item);
      });

      SetCustomer(temp);
    };
    req();
  }, []);
  console.log(customer);

  return (
    <Layout>
      <div className="ml-4 overflow-auto">
        <h1 className="font-bold py-3">Order</h1>
        <table className=" w-full mt-2">
          <thead>
            <tr className="bg-red-400 text-center">
              <th className=" px-3 py-2">Custmer Name</th>
              <th>Email</th>
              <th>Mobile</th>

              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((item, index) => (
              <tr
                className="text-center "
                style={{
                  backgroundColor: (index + 1) % 2 == 0 ? "lightgray" : "white",
                }}
              >
                <div className=" flex  md:ml-16">
                  <img
                    src="/images/1.jpg"
                    className="h-10 w-10 rounded-full   "
                  />

                  <td className="  text-center font-bold ">{item.name} </td>
                </div>

                <td className="">{item.email}</td>
                <td>{item.mobile}</td>

                <td>
                  {moment(item.createdAt.toDate()).format(
                    "  DD MMM YYYY hh:ss"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Customers;
