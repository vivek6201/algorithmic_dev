export interface SidebarChildItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SidebarChildItem[];
}
