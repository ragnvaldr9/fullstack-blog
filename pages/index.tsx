import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { PageSection } from '../components/layout/shared';
import { PostsWrapper } from '../components/indexPage/PostsWrapper';
import { postsRepo } from '../core/db';
import { initializeApollo } from '../core/apollo/client/client';
import { LOCAL_POSTS_DATA } from '../core/apollo/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const { posts, lastId } = await postsRepo.getAll();

  const apolloClient = initializeApollo();

  apolloClient.cache.writeQuery({
    query: LOCAL_POSTS_DATA,
    data: {
      lastId,
      posts,
    },
  });

  return {
    props: {
      posts,
      lastId,
      initialApolloState: apolloClient.cache.extract(),
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
      <PageSection>
        <PostsWrapper posts={posts} />
      </PageSection>
    </>
  );
};

export default Home;
