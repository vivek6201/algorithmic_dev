'use client';

import { motion } from 'motion/react';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { BookOpen, Briefcase, FileText, Users, Trophy, Clock } from '@repo/ui';

const features = [
  {
    icon: BookOpen,
    title: 'Chapter-wise Tutorials',
    description:
      'Learn step-by-step with our structured, chapter-based approach. Each tutorial is broken down into digestible segments.',
    color: 'text-blue-500',
  },
  {
    icon: FileText,
    title: 'Expert Blogs',
    description:
      'Access in-depth articles written by industry experts covering the latest trends and best practices.',
    color: 'text-green-500',
  },
  {
    icon: Briefcase,
    title: 'Career Opportunities',
    description:
      'Discover job openings from top companies and connect with potential employers in your field.',
    color: 'text-purple-500',
  },
  {
    icon: Users,
    title: 'Community Learning',
    description:
      'Join a vibrant community of learners, share knowledge, and collaborate on projects.',
    color: 'text-orange-500',
  },
  {
    icon: Trophy,
    title: 'Skill Certificates',
    description:
      'Earn verified certificates upon completion of courses to showcase your achievements.',
    color: 'text-red-500',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with lifetime access to all content and materials.',
    color: 'text-indigo-500',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">AlgorithmicDev?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to accelerate your learning journey and advance your career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/60 backdrop-blur-sm">
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-6 ${feature.color}`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
