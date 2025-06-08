import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { User, LogOut, BookOpen } from '@repo/ui';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';

interface UserProfileSheetProps {
  children: React.ReactNode;
}

const UserProfileSheet = ({ children }: UserProfileSheetProps) => {
  const session = useSession();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Profile</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-6 mt-6 h-[90%] sm:h-[95%]">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session.data?.user?.image ?? '/placeholder.svg'} alt="User" />
              <AvatarFallback className="text-xl">{session.data?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{session.data?.user?.name}</h3>
              <p className="text-sm text-muted-foreground">{session.data?.user?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 flex-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              size="lg"
              onClick={() => router.push('/profile')}
            >
              <User className="h-4 w-4 mr-3" />
              My Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              size="lg"
              onClick={() => router.push('/profile/bookmarks')}
            >
              <BookOpen className="h-4 w-4 mr-3" />
              My Bookmarks
            </Button>
          </div>
          <SheetFooter className="pt-4 border-t">
            <Button variant="outline" className="w-full" size="lg" onClick={() => signOut()}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </SheetFooter>
        </div>
        {/* Logout Button */}
      </SheetContent>
    </Sheet>
  );
};

export default UserProfileSheet;
