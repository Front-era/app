import { envAwareFetch as fetch } from 'src/shared/utils/fetch';
import { GetServerSideProps } from 'next';
import { BlogPost } from 'src/shared/types/blog-post';
import Link from 'next/link';
import { FC } from 'react';

type TBlogProps = {
  post: BlogPost;
};

const Blog: FC<TBlogProps> = ({ post }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>Blog {post.title}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TBlogProps> = async (
  ctx,
) => {
  const id = ctx.query.id;
  const post = await fetch(`/api/blog-posts/${id}`);

  return { props: { post } };
};

export default Blog;
