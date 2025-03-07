// user role extractor
export const userRoleExtractor = (
  roleData: number | string | undefined
): string => {
  switch (roleData) {
    case 0:
      return "Admin";
    case 1:
      return "Content Writter";
    default:
      return "Unknown Role";
  }
};
