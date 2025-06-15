'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@repo/ui/components/ui/avatar';

const testimonials = [
  {
    content:
      'This platform has been a game-changer for my career. I found my current job through the job board and have learned so many new skills from the tutorials.',
    author: {
      name: 'Sarah Johnson',
      title: 'Frontend Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
  },
  {
    content:
      "The community here is incredible. I've connected with mentors who've helped me navigate my tech journey and made lifelong professional relationships.",
    author: {
      name: 'Michael Chen',
      title: 'Software Engineer',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
  },
  {
    content:
      'Writing blogs on this platform helped me establish myself as a thought leader in my field. The exposure has opened up speaking opportunities and consulting gigs.',
    author: {
      name: 'Jessica Rodriguez',
      title: 'Data Scientist',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
  },
  {
    content:
      'The tutorials on Algorithmic Dev are simply the best. They helped me transition from a junior to a senior developer in just a year.',
    author: {
      name: 'Alex Thompson',
      title: 'Senior Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
    },
  },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full py-24 dark:bg-background bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight text-blue-600 dark:text-white">
            Hear from our community
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don’t just take our word for it — hear how real developers have grown with us.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel opts={{ align: 'start', loop: true }} className="w-full flex flex-col">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full rounded-2xl border border-muted bg-muted/20 shadow-sm dark:bg-muted/30 transition hover:shadow-md">
                      <CardContent className="flex flex-col justify-between h-full p-6 gap-6">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          “{testimonial.content}”
                        </p>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {testimonial.author.avatarUrl ? (
                              <AvatarImage
                                src={testimonial.author.avatarUrl}
                                alt={testimonial.author.name}
                              />
                            ) : (
                              <AvatarFallback>
                                {getInitials(testimonial.author.name)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {testimonial.author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.author.title}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="rounded-full hover:scale-105 transition" />
              <CarouselNext className="rounded-full hover:scale-105 transition" />
            </div> */}
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
