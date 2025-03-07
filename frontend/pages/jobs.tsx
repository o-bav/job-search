import React, { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

export default function JobApplications() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000";

    console.log("✅ API URL:", apiUrl);

    if (!apiUrl || apiUrl === "undefined") {
      console.error("❌ API URL is not defined!");
      setError("API URL is missing. Check .env.local");
    } else {
      fetch(`${apiUrl}/user/jobs/`)  // Теперь путь совпадает с API
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);
          return response.json();
        })
        .then(data => setJobs(data.jobs))
        .catch(error => {
          console.error("❌ Fetch error:", error);
          setError(error.message);
        });
    }
  }, []);

  const columns = [
    { key: "company", name: "Company", resizable: true },
    { key: "site", name: "Site", resizable: true },
    { key: "position", name: "Position", resizable: true },
    { key: "position_link", name: "Position Link", resizable: true },
    { key: "cv_sent", name: "CV Sent", resizable: true },
    { key: "recruiter_contacted", name: "Recruiter", resizable: true },
    { key: "interview_1", name: "Interview 1", resizable: true },
    { key: "interview_2", name: "Interview 2", resizable: true },
    { key: "offer_received", name: "Offer", resizable: true }
  ];

  return (
    <div style={{ height: 500 }}>
      <h1>Job Applications</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <DataGrid columns={columns} rows={jobs} defaultColumnOptions={{ resizable: true, sortable: true }} />
    </div>
  );
}
