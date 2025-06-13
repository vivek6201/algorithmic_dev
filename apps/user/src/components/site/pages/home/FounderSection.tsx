// components/home/FounderSection.tsx

import { Button } from '@repo/ui/components/ui/button';
import { Sparkles, X } from '@repo/ui';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Badge } from '@repo/ui/components/ui/badge';

export default function FounderSection() {
  return (
    <section className="bg-background text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-sm"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          MEET YOUR INSTRUCTOR
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-bold my-10">The Architect of Your Success</h2>

        <div className="max-w-[280px] sm:max-w-[480px] flex justify-center mb-10 border border-10 border-orange-500 rounded-full overflow-hidden">
          <Image
            src="/founder-image.jpg"
            alt="Vivek Kumar Gupta"
            width={500}
            height={500}
            className="w-full max-w-[400px] sm:max-w-[480px] h-auto object-contain"
          />
        </div>

        <div className="max-w-xl text-center">
          <h3 className="text-2xl font-semibold mb-1">Vivek Kumar Gupta</h3>
          <p className="text-gray-400 mb-4">Founder, AlgorithmicDev</p>

          <p className="text-gray-300 text-base leading-relaxed">
            Software Engineer (Freelancer) with a passion for building and teaching. Helping
            learners crack top tech roles through real-world dev, Python, and DSA. I built
            AlgorithmicDev to make learning practical and goal-driven.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/vivek6201" target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/vivek-kumar-gupta-/"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="origin"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://x.com/_Vivek_930" target="_blank" rel="noopener noreferrer">
                <X className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="mt-6 text-sm text-gray-500">Fullstack Engineer • Freelancer</div>
        </div>
      </div>
    </section>
  );
}
