import {UpdateResult} from 'typeorm';

import {IPost} from '../../entity';

export interface IPostRepository {
    createPost(post: IPost): Promise<IPost>;

    getUserPosts(id: number): Promise<IPost[]>;

    getUserPostByParams(filteredObject: Partial<IPost>): Promise<IPost | undefined>

    updatePost(id: number, title: string, text: string): Promise<UpdateResult>;
}