const roles = ["Frontend", "Backend", "DevOps", "Full-Stack", "Data"];
const types = ["Full-Time", "Part-Time", "Internship", "Contract"];
const experience = ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"];

const JobFilters = () => {
  return (
    <aside className="space-y-6 text-sm">
      {/* Role */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Role</h3>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <button
              key={r}
              className="px-3 py-1 rounded-full border hover:bg-blue-500 hover:text-white transition text-gray-700 dark:text-gray-300"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Job Type</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              className="px-3 py-1 rounded-full border hover:bg-blue-500 hover:text-white transition text-gray-700 dark:text-gray-300"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Experience</h3>
        <div className="flex flex-wrap gap-2">
          {experience.map((e) => (
            <button
              key={e}
              className="px-3 py-1 rounded-full border hover:bg-blue-500 hover:text-white transition text-gray-700 dark:text-gray-300"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default JobFilters;
