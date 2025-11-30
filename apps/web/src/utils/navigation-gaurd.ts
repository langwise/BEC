import {
  NavigationGroup,
  NavigationSubItem,
  NavigationItemChild,
} from "@/types/navigation";

export function isGroup(item: NavigationItemChild): item is NavigationGroup {
  return "items" in item;
}

export function isLink(item: NavigationItemChild): item is NavigationSubItem {
  return "href" in item;
}
