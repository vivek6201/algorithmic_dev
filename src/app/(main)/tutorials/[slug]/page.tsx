import TutorialAds from "@/components/site/pages/tutorials/tutorial/TutorialAdsSection";
import TutorialContent from "@/components/site/pages/tutorials/tutorial/TutorialContent";
import TutorialSidebar from "@/components/site/pages/tutorials/tutorial/TutorialSidebar";
import React from "react";

const TutorialPage = ({ params }: { params: { slug: string } }) => {
  console.log(params);
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-20 px-4 lg:px-0 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.4fr_0.8fr] gap-6">
        {/* Left: Chapters + Topics */}
        <aside className="">
          <TutorialSidebar />
        </aside>

        {/* Center: Content */}
        <main>
          <TutorialContent />
        </main>

        {/* Right: Ads / Related */}
        <aside className="hidden lg:block">
          <TutorialAds />
        </aside>
      </div>
    </div>
  );
};

export default TutorialPage;
