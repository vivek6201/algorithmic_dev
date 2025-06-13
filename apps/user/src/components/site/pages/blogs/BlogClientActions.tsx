'use client';
import { toggleBlogBookmarkAction } from '@/actions/main/bookmark';
import { useUtilityStore } from '@/store/sidebarStore';
import { useUserStore } from '@/store/userStore';
import { BlogWithCategoryAndReactions } from '@/types/main';
import { Bookmark, ThumbsDown, ThumbsUp } from '@repo/ui';
import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function BlogClientActions({
  data,
}: {
  data: BlogWithCategoryAndReactions | null | undefined;
}) {
  const { isBookmarked, refetchBookmarks } = useUserStore();
  const { setAuthModel } = useUtilityStore();
  const session = useSession();
  const { mutate: toggleBookmark, isPending } = useMutation({
    mutationFn: () => toggleBlogBookmarkAction(data?.slug ?? ''),
    onSuccess: (res) => {
      if (res.success) {
        refetchBookmarks();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },
    onError: () => toast.error('Something went wrong!'),
  });

  const handleBookmark = () => {
    if (!data?.slug) return;

    //trigger auth modal is user is not logged in
    if (session.status === 'unauthenticated') {
      setAuthModel(true);
      return;
    }
    toggleBookmark();
  };

  return (
    <div className="flex gap-5 items-center mr-2">
      {/* <div className="flex items-center gap-1 align-baseline">
        <button>
          <ThumbsUp size={20} fill="green" stroke="0" className="opacity-60" />
        </button>
        <p>{data?.reactions.filter((it) => it.type === 'LIKE').length}</p>
      </div>

      <button>
        <ThumbsDown size={20} className="opacity-60" />
      </button> */}
      <button onClick={handleBookmark} disabled={isPending}>
        <Bookmark
          className="opacity-60 w-5 h-5"
          fill={isBookmarked('blog', data?.id ?? '') ? 'orange' : ''}
        />
      </button>
    </div>
  );
}
