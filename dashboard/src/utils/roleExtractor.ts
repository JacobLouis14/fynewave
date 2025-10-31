// user role extractor
export const userRoleExtractor = (roleData: string | undefined): string => {
  switch (roleData) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "content_writer":
      return "Content Writter";
    default:
      return "Unknown Role";
  }
};
