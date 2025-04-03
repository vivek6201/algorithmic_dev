"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [windowLoaded, setWindowLoaded] = React.useState(false);

  React.useEffect(() => {
    setWindowLoaded(true);
  }, []);

  if (!windowLoaded) return;

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <NextTopLoader showSpinner={false} />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
