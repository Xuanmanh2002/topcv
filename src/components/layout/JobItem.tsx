import React from 'react';

// Define the expected structure for the job prop
interface JobItemProps {
  job: {
    title: string;
    location: string;
    salary: string;
    company: string;  // Add company
    logots: string;   // Add logots (assuming it's a logo image or something similar)
  };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  return (
    <div className="job-item">
      <img src={job.logots} alt={`${job.company} logo`} />
      <h3>{job.title}</h3>
      <p>{job.company}</p> {/* Display company */}
      <p>{job.location}</p>
      <p>{job.salary}</p>
    </div>
  );
};

export default JobItem;
