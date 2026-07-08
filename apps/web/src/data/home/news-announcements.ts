export interface NewsAnnouncementsItem {
  id: number;
  date: string;
  title: string;
  pinned?: boolean;
  href: string;
}

export const newsData: NewsAnnouncementsItem[] = [];

export const announcementsData: NewsAnnouncementsItem[] = [];
