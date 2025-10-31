export interface RouteConfig {
  path: string;
  roles: string[];
  public?: boolean;
  label?: string;
}

export const routeConfigs: RouteConfig[] = [
  {
    path: "/dashboard",
    roles: ["admin", "super_admin"],
  },
  {
    path: "/dashboard/articles",
    roles: ["content_writer", "admin", "super_admin"],
  },
  {
    path: "/dashboard/categories",
    roles: ["admin", "super_admin"],
  },
  {
    path: "/dashboard/emails",
    roles: ["admin", "super_admin"],
  },
  {
    path: "/dashboard/users",
    roles: ["admin", "super_admin"],
  },
];
