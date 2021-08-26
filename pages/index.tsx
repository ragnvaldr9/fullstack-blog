import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { PostDTO } from '../interfaces/post';
import { postsRepo } from '../core/PostRepo';
import { PostCard } from '../components/index/PostCard';

export const getServerSideProps: GetServerSideProps = async () => {
  await postsRepo.connect();

  const posts = await postsRepo.getAll();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {posts.map((post: PostDTO) => (
        <li key={post.id}>
          <Link key={post.id} href={`/post/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
      <PostCard />
    </>
  );
};

export default Home;
