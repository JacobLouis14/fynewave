import { routeConfigs } from "@/config/route_permissions";

export function findRouteConfig(pathname: string) {
  return routeConfigs.find((config) => config.path.includes(pathname));
}

export function hasAccessToPath(pathname: string, userRole: string): boolean {
  const route = findRouteConfig(pathname);

  if (!route) return true;
  return route.roles.includes(userRole);
}
