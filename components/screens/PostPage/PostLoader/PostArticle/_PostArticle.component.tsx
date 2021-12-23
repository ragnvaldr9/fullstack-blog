import React from 'react';

import { Article, ArticleInfo, PostContent } from './_PostArticle.styles';
import { FullPostDTO } from '../../../../../common/contracts/PostDTO';
import { DateView } from '../../../../common/DateView';
import { ViewsCounter } from './ViewsCounter';

export interface PostArticleProps extends Pick<FullPostDTO, 'title' | 'content' | 'postDate' | 'views'> {}

export const PostArticle: React.FC<PostArticleProps> = ({ title, content, postDate, views }) => {
  return (
    <Article>
      <h1>{title}</h1>
      <ArticleInfo>
        <DateView date={postDate} />
        <ViewsCounter views={views} />
      </ArticleInfo>
      <PostContent dangerouslySetInnerHTML={{ __html: content }} />
    </Article>
  );
};
