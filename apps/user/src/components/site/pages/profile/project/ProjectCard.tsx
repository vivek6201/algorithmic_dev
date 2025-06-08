'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { ExternalLink, Github, Clock, Trash2, Pencil } from '@repo/ui';
import { format } from '@repo/ui';
import { useProfileStore } from '@/store/profileStore';
import { Project } from '@repo/db';
import { deleteProjectData } from '@/actions/main/profile';
import { toast } from '@repo/ui/components/ui/sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import { useUserProfile } from '@/contexts/ProfileContext';

export default function ProjectCard({
  project,
  handleEditAction,
}: {
  project: Project;
  handleEditAction: () => void;
}) {
  const { projectName, description, githubLink, projectLink, startDate, endDate, inProgress } =
    project;
  const { setProjectForm } = useProfileStore();
  const { triggerRefetch } = useUserProfile();

  const handleDelete = async () => {
    try {
      const { message, success } = await deleteProjectData(project.id);
      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      triggerRefetch();
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <Card className="group relative w-full h-full flex flex-col justify-between rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md dark:border-border/50 dark:bg-muted/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-foreground capitalize">
          {projectName}
        </CardTitle>
        <Badge variant={inProgress ? 'default' : 'secondary'}>
          {inProgress ? 'In Progress' : 'Completed'}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">{description}</p>

        <div className="flex flex-wrap gap-3 text-xs items-center text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {format(new Date(startDate), 'dd MMM yyyy')} –{' '}
            {endDate ? format(new Date(endDate), 'dd MMM yyyy') : 'Ongoing'}
          </span>
        </div>

        <div className="flex gap-3 mt-4 flex-wrap items-center justify-between">
          <div className="space-x-2">
            <a href={githubLink ?? ''} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="outline">
                <Github />
              </Button>
            </a>

            {projectLink && (
              <a href={projectLink} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="secondary">
                  <ExternalLink />
                </Button>
              </a>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant={'secondary'}
              size={'icon'}
              onClick={() => {
                setProjectForm(project);
                handleEditAction();
              }}
            >
              <Pencil />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'icon'}>
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this project
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
