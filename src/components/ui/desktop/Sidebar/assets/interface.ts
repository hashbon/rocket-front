export interface ISidebarProps {
  items: ISidebarItem[];
}

export interface ISidebarItem {
  title: string;
  key: string;
  onClick: () => void;
  icon?: React.ReactNode;
  active?: boolean;
}
