import { DbInstance, FullPostDTO, PostPreviewDTO, PostRepoStruct, PostsDataDTO } from '../interfaces/post';
import { connectToDb } from './utils/connectToDb';
import { omit, takeLast } from '../../../utils';
import { POSTS_PAGE_SIZE } from '../../config/constants';

interface Document {
  [key: string]: any;
}

const normalizePost = <T extends Partial<FullPostDTO>>(postDocument: Document, exclude: string[]): T => {
  const post = omit(postDocument, exclude) as T;
  post.id = postDocument._id.toHexString();

  return post;
};

export class PostRepoMongo implements PostRepoStruct {
  private _connect = async (): Promise<DbInstance> => {
    return await connectToDb();
  };

  getOne = async (slug: string): Promise<FullPostDTO | undefined> => {
    const { db } = await this._connect();

    const post = await db.collection('posts').findOne({ slug: slug });

    if (!post) {
      return undefined;
    }

    return normalizePost<FullPostDTO>(post, ['_id']);
  };

  getAll = async (lastId?: string): Promise<PostsDataDTO> => {
    const { db } = await this._connect();

    const filter = lastId ? { _id: { $gt: lastId } } : {};

    const options = { projection: { content: 0, views: 0 } };

    const cursor = await db.collection('posts').find(filter, options).limit(POSTS_PAGE_SIZE);

    const count = await cursor.count();

    if (count === 0) {
      await cursor.close();

      return {
        posts: [],
      };
    }

    const rawPosts = await cursor.toArray();

    const lastPost = takeLast(rawPosts);

    const newLastId = lastPost ? lastPost._id.toHexString() : undefined;

    await cursor.close();

    const posts = rawPosts.map((post) => normalizePost<PostPreviewDTO>(post, ['_id']));

    const result: PostsDataDTO = {
      posts,
    };

    if (newLastId) {
      result.lastId = newLastId;
    }

    return result;
  };
}
