import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/types/blog-post';

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

export const getServerSideProps: GetServerSideProps<TBlogProps> = async () => {
  const post: BlogPost = {
    id: 1, // Change 'sample-id' to a number
    title: 'Sample Title',
    // Add other necessary fields if required
  };

  return { props: { post } };
};

export default Blog;
