export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserDataModel {
  _id?: string;
  password?: string;
  name: string;
  email: string;
  role: number | string;
  isEditAllowed?: boolean;
  isSuspended?: boolean;
  editAllotedArticle?: [];
  editAllotedArticleDetails?: [{ _id: string; title: string }];
}

export interface UserForUserEditPermission {
  _id: string;
  email: string;
}
