import type { LucideIcon } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";

export type SubMenuItem = {
    name: string;
    description?: string;
    icon?: LucideIcon;
};

export type MenuItem = {
    name: string;
    subMenuHeading?: string[];
    subMenu?: SubMenuItem[];
    gridCols?: 1 | 2 | 3;
};

export const Menus: MenuItem[] = [
    {
        name: "Movies",
        subMenuHeading: ["Sub headq", "Sub Menu 2"],
        subMenu: [
            {
                name: "Sub Menu 1",
                description: "Description for Sub Menu 1",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 2",
                description: "Description for Sub Menu 2",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 3",
                description: "Description for Sub Menu 3",
                icon: PanelsTopLeft
            }
        ],
        gridCols: 2,
    },
    {
        name: "TV Shows",
        subMenuHeading: ["Sub Menu 1", "Sub Menu 2"],
        subMenu: [
            {
                name: "Sub Menu 1",
                description: "Description for Sub Menu 1",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 2",
                description: "Description for Sub Menu 2",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 3",
                description: "Description for Sub Menu 3",
                icon: PanelsTopLeft
            }
        ],
        gridCols: 3,
    },
    {
        name: "People",
        subMenuHeading: ["Sub Menu 1", "Sub Menu 2"],
        subMenu: [
            {
                name: "Sub Menu 1",
                description: "Description for Sub Menu 1",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 2",
                description: "Description for Sub Menu 2",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 3",
                description: "Description for Sub Menu 3",
                icon: PanelsTopLeft
            }
        ],
        gridCols: 1,
    },
    {
        name: "TV Shows",
        subMenuHeading: ["Sub Menu 1", "Sub Menu 2"],
        subMenu: [
            {
                name: "Sub Menu 1",
                description: "Description for Sub Menu 1",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 2",
                description: "Description for Sub Menu 2",
                icon: PanelsTopLeft
            },
            {
                name: "Sub Menu 3",
                description: "Description for Sub Menu 3",
                icon: PanelsTopLeft
            }
        ],
        gridCols: 2,
    },
    {
        name: "Contact",
    }
]
