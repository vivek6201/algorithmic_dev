'use client';
import { Button } from '@repo/ui/components/ui/button';
import { Badge } from '@repo/ui/components/ui/badge';
import { ArrowRight, Briefcase, Play, Star } from '@repo/ui';
import { useRouter } from 'nextjs-toploader/app';

const technologies = [
  'Web Development',
  'Android Development',
  'iOS Development',
  'React',
  'Node.js',
  'Python',
  'Machine Learning',
  'Data Science',
];

const moreTechnologies = [
  'DevOps',
  'Cloud Computing',
  'UI/UX Design',
  'Blockchain',
  'Cybersecurity',
  'Game Development',
  'Full Stack Development',
  'Flutter',
];

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 w-full" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '1s' }}
      />

      <div className="container mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
            <Star className="w-4 h-4 mr-2" />
            <p className="text-xs sm:text-sm">Trusted by 50,000+ learners worldwide</p>
          </div>

          <h1 className="text-3xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Master New Skills</span>
            <br />
            <span className="text-foreground">with Expert-Led</span>
            <br />
            <span className="text-foreground">Learning Paths</span>
          </h1>

          <p className="text-sm md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive tutorials, insightful blogs, and career opportunities all in one
            place. Learn at your own pace with our chapter-wise approach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-6 animate-glow group"
              onClick={() => router.push('/tutorials')}
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base md:text-lg px-8 py-6 group"
              onClick={() => router.push('/jobs')}
            >
              <Briefcase className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore Jobs
            </Button>
          </div>

          {/* Infinite Sliders */}
          <div className="relative overflow-hidden space-y-4">
            {/* First slider - moving right to left */}
            <div className="flex animate-slide-left whitespace-nowrap">
              {[...technologies, ...technologies].map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="mx-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors flex-shrink-0"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Second slider - moving left to right */}
            <div className="flex animate-slide-right whitespace-nowrap">
              {[...moreTechnologies, ...moreTechnologies].map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="mx-2 px-4 py-2 text-sm font-medium bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20 transition-colors flex-shrink-0"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
