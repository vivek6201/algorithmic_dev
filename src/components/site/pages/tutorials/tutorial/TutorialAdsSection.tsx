const TutorialAds = () => {
    return (
      <aside className="w-72 hidden xl:block p-6">
        <div className="sticky top-6 space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl shadow">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 font-semibold">
              Sponsored
            </p>
            <p className="text-xs mt-2">
              Start your C journey with our hands-on C Programming Bootcamp. Enroll now!
            </p>
          </div>
  
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl shadow">
            <p className="font-semibold mb-1">Related Tutorials</p>
            <ul className="text-xs text-blue-800 dark:text-blue-200 list-disc pl-4">
              <li>Pointers in C</li>
              <li>Arrays and Strings</li>
              <li>Dynamic Memory Allocation</li>
            </ul>
          </div>
        </div>
      </aside>
    );
  };
  
  export default TutorialAds;
  