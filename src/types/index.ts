export type TUser = {
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export type TProject = {
  _id: string;
  heading: string;
  title: string;
  des: string;
  img: string;
  iconLists?: string[];
  link: string;
  clientSiteCode: string;
  backendSiteCode: string;
  techStack: string[];
};

export type TBlog = {
  _id: string;
  authorName: string;
  title: string;
  file: string;
  quote: string;
  isDeleted: boolean;
}
