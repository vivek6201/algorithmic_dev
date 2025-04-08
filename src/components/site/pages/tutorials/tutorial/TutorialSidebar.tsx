import { BookOpen, ChevronRight } from "lucide-react";

const chapters = [
  {
    title: "📘 Introduction",
    topics: ["What is JavaScript?", "Why Learn JavaScript?"],
  },
  {
    title: "🔧 Basics",
    topics: ["Variables", "Data Types", "Operators"],
  },
  {
    title: "⚙️ Advanced Concepts",
    topics: ["Closures", "Async/Await", "Modules"],
  },
];

const TutorialSidebar = () => {
  return (
    <aside className="w-full p-4 rounded-2xl border shadow-sm dark:border-neutral-700 dark:bg-neutral-900 bg-white">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
        <BookOpen size={20} />
        Course Content
      </h2>

      <div className="space-y-6">
        {chapters.map((chapter, i) => (
          <div key={i}>
            <h3 className="text-md font-semibold text-purple-600 dark:text-purple-400 mb-2">
              {chapter.title}
            </h3>
            <ul className="space-y-1 ml-2">
              {chapter.topics.map((topic, j) => (
                <li
                  key={j}
                  className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                >
                  <ChevronRight size={14} className="mr-1" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default TutorialSidebar;
