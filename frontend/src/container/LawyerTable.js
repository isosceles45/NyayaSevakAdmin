import React, { useState } from 'react';
import axios from 'axios';
import { MdDoneOutline } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { BiFirstPage, BiLastPage } from "react-icons/bi";

const LawyerTable = ({ lawyerData, updateLawyerData  }) => {

  const rowsPerPage = 8; // Number of rows to display per page
  const [currentPage, setCurrentPage] = useState(1);


  const handleApprove = async (id) => {
    try {
      // Make the approval request to your backend
      const response = await axios.get(`http://localhost:5000/api/lawyers/verified/${id}`, {
        isServiceProvider: true,
      });
  
      if (response.status === 200) {
        // Update the lawyer's status in the UI by calling the callback function
        const updatedLawyerData = lawyerData.map((lawyer) =>
          lawyer.id === id ? { ...lawyer, isServiceProvider: true } : lawyer
        );
  
        // Call the callback function to update the lawyer data in the Home component
        updateLawyerData(updatedLawyerData);
      } else {
        console.error('Error approving lawyer:', response.data);
      }
    } catch (error) {
      console.error('Error approving lawyer:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      // Make the rejection request to your backend
      const response = await axios.get(`http://localhost:5000/api/lawyers/cancelled/${id}`, {
        isServiceProvider: false,
      });
  
      if (response.status === 200) {
        // Update the lawyer's status in the UI by calling the callback function
        const updatedLawyerData = lawyerData.map((lawyer) =>
          lawyer.id === id ? { ...lawyer, isServiceProvider: false } : lawyer
        );
  
        // Call the callback function to update the lawyer data in the Home component
        updateLawyerData(updatedLawyerData);
      } else {
        console.error('Error rejecting lawyer:', response.data);
      }
    } catch (error) {
      console.error('Error rejecting lawyer:', error);
    }
  };
  
  

  const totalPages = Math.ceil(lawyerData.length / rowsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, lawyerData.length);

  const lawyersOnPage = lawyerData.slice(startIndex, endIndex);

  return (
    <div className="mt-4">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Sr. No.</th>
            <th className="py-3 px-6 text-left">Lawyer Name</th>
            <th className="py-3 px-6 text-left">Enrollment Number</th>
            <th className="py-3 px-6 text-left">Pass Certificate</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {lawyersOnPage.map((lawyer, index) => (
            <tr key={lawyer.id}>
              <td className="py-3 px-6 whitespace-nowrap">{index + 1}</td>
              <td className="py-3 px-6 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-2">
                    <div className="text-sm font-medium text-gray-900 underline"
                    >{lawyer.name}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                <div className="text-sm text-blue-700">{lawyer.enrollment_number}</div>
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <a href={lawyer.pass_certificate} target="_blank" rel="noopener noreferrer">
                    <img
                      src={lawyer.pass_certificate}
                      alt="Pass Certificate"
                      className="w-14 rounded"
                    />
                  </a>
                </div>
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                    lawyer.isServiceProvider ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {lawyer.isServiceProvider  ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                <button
                  className={`bg-white hover:bg-gray-900 text-gray-900 hover:text-white text-xl py-3 px-3 rounded-full mr-2 shadow-lg`}
                  onClick={() => handleApprove(lawyer.id)}
                >
                  <MdDoneOutline/>
                </button>
                <button
                  className={`bg-white hover:bg-gray-900 text-gray-900 hover:text-white text-xl py-3 px-3 rounded-full mr-2 shadow-lg`}
                  onClick={() => handleReject(lawyer.id)}
                >
                  <MdCancel/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex justify-end">
        <div
          className="bg-white px-3 mt-1 text-gray-600 hover:text-gray-800 text-xl shadow-sm hover:cursor-pointer"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <BiFirstPage/>
        </div>
        <span className="mx-2 text-gray-900">
          Page {currentPage} of {totalPages}
        </span>
        <div
          className="bg-white px-3 mt-1 text-gray-600 hover:text-gray-800 text-xl shadow-sm hover:cursor-pointer"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <BiLastPage/>
        </div>
      </div>
    </div>
  );
};

export default LawyerTable;
