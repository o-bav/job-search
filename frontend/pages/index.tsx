import { useEffect, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/user/jobs/")
      .then(response => response.json())
      .then(data => setJobs(data.jobs))
  }, []);

  return (
    <div>
      <h1>Job Applications</h1>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job.company} - {job.position}</li>
        ))}
      </ul>
    </div>
  );
}
