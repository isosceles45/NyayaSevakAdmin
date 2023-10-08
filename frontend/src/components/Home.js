import React, { useState, useEffect } from 'react';
import Header from '../container/Header';
import Sidebar from '../container/Sidebar';
import LawyerTable from '../container/LawyerTable';

export default function Home () {
  const [lawyerData, setLawyerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {

    // Fetch all lawyer data (IDs and other info)
    fetch('http://localhost:5000/api/lawyers/all')
      .then((response) => response.json())
      .then(async (data) => {
        // Create an array to store updated lawyer data
        const updatedLawyerData = [];

        // Fetch the isServiceProvider status for each lawyer individually
        for (const lawyer of data) {
          try {
            const response = await fetch(`http://localhost:5000/api/lawyers/user/${lawyer.id}`);
            const lawyerStatusData = await response.json();
            const updatedLawyer = {
              ...lawyer,
              isServiceProvider: lawyerStatusData.isServiceProvider,
            };
            updatedLawyerData.push(updatedLawyer);
          } catch (error) {
            console.error('Error fetching lawyer status:', error);
          }
        }

        // Update the lawyer data with the fetched statuses
        setLawyerData(updatedLawyerData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching lawyer data:', error);
        setIsLoading(false);
      });
  }, []);

  const updateLawyerData = (updatedLawyerData) => {
    setLawyerData(updatedLawyerData);
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
  
      <div className="flex">
        {/* Sidebar */}
        <div className="sticky top-0 h-screen w-64 bg-white"> {/* Add sticky, top-0, h-screen, w-64, and bg-white styles */}
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-5 overflow-y-auto">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">  
            {isLoading ? (
              <p>Loading lawyer data...</p>
            ) : (
              <div className="mt-4">
                {/* Pass lawyer data as props to the LawyerTable component */}
                <LawyerTable lawyerData={lawyerData} updateLawyerData={updateLawyerData}/>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  ); 
};