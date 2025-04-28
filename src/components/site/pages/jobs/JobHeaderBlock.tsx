"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { toast } from "sonner";
import { FaWhatsapp, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Bookmark, Share2 } from "lucide-react";

export default function JobHeaderBlock({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  console.log({ slug });
  const fullUrl = `${window.location.origin}${window.location.pathname}`;
  const openSharePopup = (url: string) => {
    window.open(url, "_blank", "width=600,height=600");
  };

  const jobUrl = encodeURIComponent(fullUrl);
  const message = encodeURIComponent("Check out this awesome job opportunity!");

  const shareOnLinkedIn = () => {
    openSharePopup(
      `https://www.linkedin.com/sharing/share-offsite/?url=${jobUrl}`
    );
  };

  const shareOnTwitter = () => {
    openSharePopup(
      `https://twitter.com/intent/tweet?url=${jobUrl}&text=${message}`
    );
  };

  const shareOnWhatsApp = () => {
    openSharePopup(`https://api.whatsapp.com/send?text=${message}%20${jobUrl}`);
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(fullUrl);
      toast.success("copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("failed to copy");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4">{title}</h1>
        <Button className="hidden md:block mr-5">Save Job</Button>
      </div>
      <div className="flex items-center gap-2">
        <ActionButton onClick={shareOnWhatsApp}>
          <FaWhatsapp />
        </ActionButton>
        <ActionButton onClick={shareOnLinkedIn}>
          <FaLinkedinIn />
        </ActionButton>
        <ActionButton onClick={shareOnTwitter}>
          <FaTwitter />
        </ActionButton>
        <ActionButton onClick={copyToClipboard}>
          <Share2 />
        </ActionButton>
        <ActionButton className="md:hidden w-10 h-10 rounded-full">
          <Bookmark />
        </ActionButton>
      </div>
    </>
  );
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function ActionButton({ children, ...props }: ActionButtonProps) {
  return (
    <Button
      variant={"outline"}
      className={cn("rounded-full w-10 h-10", props.className)}
      {...props}
    >
      {children}
    </Button>
  );
}
