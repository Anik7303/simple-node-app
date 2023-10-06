export default interface Post {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
