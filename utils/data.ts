import {
  House,
  LibraryBig,
  GalleryVerticalEnd,
  GalleryHorizontal,
  User,
  LayoutDashboard,
  GalleryThumbnails,
} from "lucide-react";

// Array of home links for the navigation bar
export const HomeLinksPage = [
  {
    href: "/",
    label: "Accueil",
    icon: House,
  },
  {
    href: "#",
    label: "Nouveautés",
    icon: LibraryBig,
  },
  {
    href: "#",
    label: "Populaire",
    icon: GalleryVerticalEnd,
  },
  {
    href: "#",
    label: "Illustrations",
    icon: GalleryHorizontal,
  },
];

export const ProfileUserPages = [
  {
    href: "/overview",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/contenus",
    label: "Mes publications",
    icon: GalleryThumbnails,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
];
