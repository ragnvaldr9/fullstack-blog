import Link from 'next/link';
import React from 'react';
import {
  PostCardContent,
  PostCardTitle,
  PostCoverWrapper,
  PostRoot,
  PostHashTags,
  ReadMoreLink,
  PostCardInfo,
} from './_PostCard.styles';

import { formatHashTagToHref, formatHashTagToView } from '../../../../helpers';
import { PostViews } from '../../../common/PostViews/_PostViews.component';
import { HashTagUI } from '../../../../contracts/HashTagDTO';
import { PostPreviewDTO } from '../../../../contracts/PostDTO';
import { DateView } from '../../../common/DateView';

export interface PostCardProps extends PostPreviewDTO {}

const normalizeHashTags = (tags: string[]): HashTagUI[] =>
  tags.map((tag) => ({
    tag: formatHashTagToView(tag),
    href: `/tags/${formatHashTagToHref(tag)}`,
  }));

const PostCardInner: React.FC<PostCardProps> = ({ title, annotation, cover, tags, slug, postDate, views = 0 }) => {
  return (
    <PostRoot as="article">
      <PostCoverWrapper>
        <img src={`/${cover}`} alt="Post cover" />
      </PostCoverWrapper>
      <PostCardContent>
        <PostCardTitle>{title}</PostCardTitle>
        <PostCardInfo>
          <DateView date={postDate} />
          <PostViews views={views} />
        </PostCardInfo>
        {tags && <PostHashTags tags={normalizeHashTags(tags)} />}
        <p>{annotation}</p>
        <Link href={`/post/${slug}`} passHref>
          <ReadMoreLink>Read more</ReadMoreLink>
        </Link>
      </PostCardContent>
    </PostRoot>
  );
};

export const PostCard = React.memo(PostCardInner);
