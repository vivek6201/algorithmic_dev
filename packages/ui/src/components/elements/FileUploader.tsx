'use client';

import Dropzone, { DropzoneState } from 'shadcn-dropzone';
import { FileIcon, UploadCloud } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

const FileUploader: React.FC<{ onDrop: (data: any) => void }> = ({ onDrop }) => {
  return (
    <Dropzone onDrop={onDrop}>
      {(dropzone: DropzoneState) => (
        <div
          className={cn(
            'w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all',
            dropzone.isDragActive ? 'border-blue-500 bg-blue-50' : 'border-muted hover:bg-muted/40',
          )}
        >
          <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />

          {dropzone.isDragReject && (
            <p className="text-sm text-red-500 font-medium">Unsupported file type.</p>
          )}

          {!dropzone.isDragActive && (
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Drag & drop your files here
              </p>
              <p className="text-xs text-muted-foreground">or click to select files</p>
            </div>
          )}

          {dropzone.isDragAccept && (
            <p className="text-sm font-medium text-blue-500">Drop files now!</p>
          )}

          {dropzone.acceptedFiles.length > 0 && (
            <div className="mt-4 w-full">
              <ul className="text-xs space-y-1 text-muted-foreground">
                {dropzone.acceptedFiles.map((file, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <FileIcon className="w-4 h-4" />
                    <span className="truncate">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default FileUploader;
