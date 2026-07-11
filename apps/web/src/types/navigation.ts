export interface NavigationSubItem {
  title: string;
  href: string;
}

export interface NavigationGroup {
  title: string;
  items: NavigationSubItem[];
}

export type NavigationItemChild = NavigationSubItem | NavigationGroup;

export interface NavigationItem {
  title: string;
  href?: string;
  items?: NavigationItemChild[];
  groupsFirst?: boolean;
}
