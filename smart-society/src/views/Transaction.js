import React, { useState, useEffect } from "react";
import TransactionsMobileTable from "../components/TransactionMobileTable";
import TableCell from "../components/TableCell";
import TableHeader from "../components/TableHeader";
import Contents from "../components/Contents";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

function Transaction() {
  const [transaction, setTransaction] = useState([]);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      const searchvalues = values.search.split().join("+");

      const url = `http://127.0.0.1:8000/api/payments/transactions/?search=${searchvalues}`;
      const fetchData = async () => {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        resetForm({ values: "" });
        if (response.ok) {
          setTransaction(array.results);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.setItem("isLoggedIn", "false");
          navigate("/login");
        }
      };
      fetchData();
    },
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = "http://127.0.0.1:8000/api/payments/transactions/";
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const array = await response.json();
      if (response.ok) {
        setTransaction(array.results);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="flex-col hidden sm:flex">
            <div className="overflow-x-auto py-5">
              <div className="text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
                Transactions
              </div>
              <form
                className="border rounded flex my-3 mx-5"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="text"
                  className="w-full px-4 py-2"
                  placeholder="Search..."
                  name="search"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.search}
                />
                <button type="submit" className="px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
              <div
                className="
              py-3
              align-middle
              inline-block
              min-w-full
              px-5
              md:py-5
            "
              >
                <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white ">
                      <tr>
                        <TableHeader title="To/From" />
                        <TableHeader title="Date and Time" />
                        <TableHeader title="Paid/Received" />
                        <TableHeader title="Amount" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transaction &&
                        transaction.map((element) => {
                          return (
                            <tr
                              key={element.s_no}
                              className="divide-x-2 divide-gray-200 even:bg-gray-100"
                            >
                              <TableCell value={element.to} />
                              <TableCell
                                value={new Date(element.date).toLocaleString(
                                  "en-in"
                                )}
                              />
                              <TableCell value={element.option} />
                              <TableCell value={element.amount.toString()} />
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col flex sm:hidden">
            <div className="overflow-x-auto py-5">
              <div className="text-center uppercase font-semibold text-xl dark:text-white">
                Transactions
              </div>
              <form
                className="border rounded flex my-3 mx-5"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="text"
                  className="w-full px-4 py-2"
                  placeholder="Search..."
                  name="search"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.search}
                />
                <button type="submit" className="px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black dark:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
              {transaction &&
                transaction.map((element) => {
                  return (
                    <div key={element.s_no}>
                      <TransactionsMobileTable
                        to={element.to}
                        date={new Date(element.date).toLocaleString("en-in")}
                        option={element.option}
                        amount={element.amount.toString()}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;