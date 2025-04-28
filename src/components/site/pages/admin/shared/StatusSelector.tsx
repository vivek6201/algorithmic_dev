'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type StatusProps = {
  status: boolean;
  handleStatusChange: (curr: boolean) => void;
};

export default function StatusSelector({ status, handleStatusChange }: StatusProps) {
  return (
    <Select value={String(status)} onValueChange={(value) => handleStatusChange(value === 'true')}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="false">Draft</SelectItem>
        <SelectItem value="true">Published</SelectItem>
      </SelectContent>
    </Select>
  );
}
