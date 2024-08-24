import React from "react";
import "./Home.css";

function Home({ company, employees, recentActivities }) {
  return (
    <div className="home-wrapper">
      <h1 className="company-name">IT svet</h1>
      <p className="employee-count">Number of Employees: 5</p>

      {/* <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))
          ) : (
            <p>No recent activities</p>
          )}
        </ul>
      </div> */}

      <div className="quick-links">
        <button
          onClick={() => {
            /* add employee logic */
          }}
        >
          Add New Employee
        </button>
        <button
          onClick={() => {
            /* add file logic */
          }}
        >
          Add New File
        </button>
      </div>
    </div>
  );
}

export default Home;
