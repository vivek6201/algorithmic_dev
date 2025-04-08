interface JobCardProps {
    title: string;
    company: string;
    location: string;
    type: string;
    experience: string;
    posted: string;
  }
  
  const JobCard = ({
    title,
    company,
    location,
    type,
    experience,
    posted,
  }: JobCardProps) => {
    return (
      <div className="border rounded-xl p-5 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className="text-xs text-gray-500">{posted}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {company} — {location}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {type} | {experience}
        </p>
      </div>
    );
  };
  
  export default JobCard;
  