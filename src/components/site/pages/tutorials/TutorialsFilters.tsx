const TutorialFilters = () => {
  const languages = ["C++", "Java", "Python", "JavaScript", "Go"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const types = ["Video", "Article", "Interactive"];

  return (
    <div className="space-y-6 text-sm">
      <div>
        <h3 className="font-semibold mb-2 dark:text-white">Language</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              className="px-3 py-1 border rounded-full hover:bg-blue-500 hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2 dark:text-white">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((level) => (
            <button
              key={level}
              className="px-3 py-1 border rounded-full hover:bg-green-500 hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-green-600"
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2 dark:text-white">Type</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              className="px-3 py-1 border rounded-full hover:bg-purple-500 hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-purple-600"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialFilters;
