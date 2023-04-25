import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../SignIn_SignUp/Sessions";
import { Tooltip } from "@mui/material";
import { UserGroupIcon } from "@heroicons/react/solid";
import noDataPic from "../../images/Asset 8.svg";
import screenSpinner from "../../images/2300-spinner.gif";
import { getAdminType } from "./AdminTypes";
import AddFeesModal from "./AddFessModal";

export default function OfferingList() {
    const navigate = useNavigate();
    const [startCount, setStartCount] = useState(1);
    const [isFetching, setIsFetching] = useState(true);
    const [limit, setLimit] = useState(5);
    const [fees_records, setFeesRecords] = useState([]);
    var admin_type = getAdminType();

    useEffect(() => {
        axios
            .get("/get-admin-fees-record", {
                headers: {
                    Authorization: getToken(),
                },
            })
            .then((response) => {
                if (response.data === 1) {
                    navigate("/logout");
                } else {
                    setFeesRecords(response.data.results);
                    setIsFetching(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    function range(start, end) {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    }

    const increaseStartCount = () => {
        if (startCount + limit <= fees_records.length) {
            setStartCount(startCount + limit);
        }
    };

    const decreaseStartCount = () => {
        setStartCount(Math.max(startCount - limit, 1));
    };
    return (
        <main>
      {/* <div className="p-10 bg-gray-100"> */}
      {/* {sessionStorage.getItem("alert") === "1" ? (
        <div
          id="alert"
          className="flex p-4 mb-4 bg-green-100 rounded-b-lg dark:bg-green-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
            Excel File added successfully.
          </div>
          <button
            type="button"
            onClick={() => sessionStorage.setItem("alert", 0)}
            className="ml-auto focus:outline-none -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
            data-collapse-toggle="alert"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )} */}
      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 xl:p-8 min-h-screen">
        <div className="flex justify-between">
          <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
            Fee Section
          </h3>
          <div className="flex space-x-4">
 <AddFeesModal/>
  </div>
  </div>
        </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            S.No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Fees Type
                                        </th>
                                        <th scope="col" className="p-4"></th>
                                        <th
                                            scope="col"
                                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Year
                                        </th>
                                        <th scope="col" className="p-4"></th>
                                        <th
                                            scope="col"
                                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Semester
                                        </th>
                                        <th scope="col" className="p-4"></th>
                                        <th
                                            scope="col"
                                            className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Amount
                                        </th>
                                        <th scope="col" className="p-4"></th>
                                    </tr>
                                </thead>
                                
                                {fees_records.length !== 0 && (
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[
                                            ...range(
                                                startCount - 1,
                                                Math.min(startCount + limit - 1, fees_records.length) - 1
                                            ),
                                        ].map((i) => (
                                            <tr key={fees_records[i].fees_id}>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                    {fees_records[i].fees_id}
                                                </td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                    {fees_records[i].fees_type}
                                                </td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                    {fees_records[i].year}
                                                </td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                    {fees_records[i].semester}
                                                </td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider"></td>
                                                <td className="p-4 text-left text-sm text-gray-500 tracking-wider">
                                                    {fees_records[i].fees_amount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>

                            {isFetching ? (
                                <img
                                    className="mx-auto h-[200px] w-[200px]"
                                    alt="Spinner"
                                    src={screenSpinner}
                                />
                            ) : (
                                fees_records.length === 0 && (
                                    <div className="bg-white">
                                        <div className="w-3/5 mx-auto my-50 text-center">
                                            <img alt="No data" src={noDataPic} />
                                            <div className="h-5" />
                                            <p className="text-2xl font-semibold">
                                                No fees open currently!
                                            </p>
                                            <div className="h-6" />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
                <div className="flex items-center mb-4 sm:mb-0">
                    <button
                        onClick={decreaseStartCount}
                        className="text-gray-500 focus:outline-none hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={increaseStartCount}
                        className="text-gray-500 focus:outline-none hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <span className="text-sm font-normal text-gray-500">
                        Showing{" "}
                        <span className="text-gray-900 font-semibold">
                            {startCount}-{Math.min(startCount + limit - 1, fees_records.length)}
                        </span>{" "}
                        of
                        <span className="text-gray-900 font-semibold">
                            {" "}
                            {fees_records.length}
                        </span>
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={decreaseStartCount}
                        className="flex-1 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                    >
                        <svg
                            className="-ml-1 mr-1 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Previous
                    </button>
                    <button
                        onClick={increaseStartCount}
                        className="flex-1 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                    >
                        Next
                        <svg
                            className="-mr-1 ml-1 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    );
}
