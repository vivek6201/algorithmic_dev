import React from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Quote } from '@repo/ui';

interface Author {
  name: string;
  title: string;
  avatarUrl?: string;
}

interface TestimonialCardProps {
  content: string;
  author: Author;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ content, author, className }) => {
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();

  return (
    <Card
      className={cn(
        'flex flex-col justify-between h-full bg-white dark:bg-muted/40 border border-muted rounded-2xl shadow-sm hover:shadow-md transition-all duration-300',
        className,
      )}
    >
      <CardContent className="relative px-6 pt-10 pb-6 flex-1">
        <Quote
          size={28}
          className="absolute top-5 left-5 text-purple-300 opacity-40 dark:opacity-20 rotate-[-6deg]"
        />
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 z-10 relative">
          “{content}”
        </p>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-muted flex items-center gap-4">
        <Avatar className="h-12 w-12 ring-1 ring-purple-400/20">
          {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
          <AvatarFallback className="bg-purple-600 text-white">
            {getInitials(author.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-foreground">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.title}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
