import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { PageSection } from '../components/layout/shared';
import { PostsListLoader } from '../components/indexPage/PostsListLoader';
import { GET_ALL_POSTS } from '../core/graphql-client';
import { wrapWithSharedPageProps, SharedPageProps } from '../backend/enhancers';
import { queryInitialApolloState } from '../core/graphql-client';

export interface HomePageOwnProps {}

export interface HomePageProps extends SharedPageProps, HomePageOwnProps {}

const getHomeServerSideProps: GetServerSideProps<HomePageOwnProps> = async () => {
  const { initialApolloState } = await queryInitialApolloState({ query: GET_ALL_POSTS });

  return {
    props: {
      initialApolloState,
    },
  };
};

export const getServerSideProps = wrapWithSharedPageProps<HomePageProps>(getHomeServerSideProps);

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageSection>
        <PostsListLoader />
      </PageSection>
    </>
  );
};

export default Home;
