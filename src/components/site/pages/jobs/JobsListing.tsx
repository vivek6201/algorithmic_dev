import JobCard from "./JobCard";

const JobListings = () => {
  const jobs = [
    {
      title: "Frontend Engineer",
      company: "TechFlow",
      location: "Remote",
      type: "Full-Time",
      experience: "1-3 Years",
      posted: "2 days ago",
    },
    {
      title: "Backend Developer",
      company: "CodeVista",
      location: "Bangalore",
      type: "Full-Time",
      experience: "3+ Years",
      posted: "1 week ago",
    },
    {
      title: "DevOps Engineer",
      company: "InfraWorks",
      location: "Mumbai",
      type: "Contract",
      experience: "3+ Years",
      posted: "3 days ago",
    },
  ];

  return (
    <main className="flex-1 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Latest Job Openings</h1>
      {jobs.map((job, index) => (
        <JobCard {...job} key={index} />
      ))}
    </main>
  );
};

export default JobListings;
