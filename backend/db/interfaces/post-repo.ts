import { Db, MongoClient } from 'mongodb';
import { FullPostDTO, PostsList } from '../../../contracts/PostDTO';
import { HashTagDTO } from '../../../contracts/HashTagDTO';

export type DbInstance = {
  client: MongoClient;
  db: Db;
};

export interface PostRepoStruct {
  getAll: (loadedCount: number, lastId?: FullPostDTO['id']) => Promise<PostsDataDTO>;
  getOne: (slug: FullPostDTO['slug']) => Promise<FullPostDTO | undefined>;
  getAllTags: () => Promise<HashTagDTO[]>;
}

export interface PostsDataDTO {
  posts: PostsList;
  loadedCount: number;
  lastId?: string;
  hasMore?: boolean;
}
