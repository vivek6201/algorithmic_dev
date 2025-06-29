import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useProfileStore } from '@/store/profileStore';
import { Education } from '@repo/db';

const EducationCard = ({ data, handleModal }: { data: Education; handleModal: () => void }) => {
  const { schoolName, degree, fieldOfStudy, startDate, endDate, grade, currentlyEnrolled } = data;
  const { setEducationForm } = useProfileStore();

  const formattedStartDate = new Date(startDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });

  const formattedEndDate = endDate
    ? new Date(endDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      })
    : 'Present';

  return (
    <div className="group relative w-full h-full flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md dark:border-border/50 dark:bg-muted/20">
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">{schoolName}</h3>
        <p className="text-sm text-muted-foreground">
          {degree} in {fieldOfStudy}
        </p>
        <p className="text-sm text-muted-foreground">
          {formattedStartDate} — {currentlyEnrolled ? 'Present' : formattedEndDate}
        </p>
        {grade && <p className="text-sm italic text-muted-foreground">Grade: {grade}</p>}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={() => {
            setEducationForm(data);
            handleModal();
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default EducationCard;
