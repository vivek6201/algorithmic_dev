import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

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

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  author,
  className,
}) => {
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card
      className={cn(
        "rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full transform hover:scale-[1.02] flex flex-col justify-between",
        className,
      )}
    >
      <CardContent className="p-6 pt-8 relative">
        <Quote
          size={32}
          className="text-purple-300 absolute top-2 left-2 transform -rotate-6"
        />
        <p className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed">
          &ldquo;{content}&ldquo;
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t flex items-center space-x-4">
        <Avatar className="h-12 w-12 ring-2 ring-tech-purple/20 transition-all hover:ring-tech-purple">
          {author.avatarUrl ? (
            <AvatarImage src={author.avatarUrl} alt={author.name} />
          ) : null}
          <AvatarFallback className="bg-tech-purple text-white">
            {getInitials(author.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
            {author.name}
          </p>
          <p className="text-xs text-neutral-400">{author.title}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
