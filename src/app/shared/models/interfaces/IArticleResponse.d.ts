declare interface IArticleResponse {
  articlesList: ArticleDTO[];
}

declare interface ArticleForPage {
  category: string;
  articles: ArticleDTO[];
}

declare interface ArticleSearchedDTO {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;

  categoryId: number;
}

declare interface ArticleDTO {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  currentState: string;
  author: GetAuthorDTO;
  category: string;
  tags: string[];
  credits: CreditDTO[];
  comments: CommentDTO[];
}

declare interface CreditDTO {
  name: string;
  link: string;
}

declare interface CommentDTO {
  id: number;
  text: string;
  createdAt: string;
  userName: string;
  userEmail: string;
}

declare interface GetAuthorDTO extends IUserData {
  quantitiesArticles: number;
}
