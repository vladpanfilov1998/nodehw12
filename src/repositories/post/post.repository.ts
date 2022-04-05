import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import {
    IPost, Post,
} from '../../entity';
import {IPostRepository} from './post.repository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getUserPosts(id: number): Promise<IPost[]> {
        return getManager().getRepository(Post)
            .createQueryBuilder('posts')
            .where('posts.userId = :id', {id})
            .getMany();
    }

    public async getUserPostByParams(filteredObject: Partial<IPost>): Promise<IPost | undefined> {
        return getManager().getRepository(Post)
            .findOne(filteredObject);
    }

    public async updatePost(id: number, title: string, text: string): Promise<UpdateResult> {
        return getManager()
            .getRepository(Post)
            .update({id}, {title, text});
    }
}

export const postRepository = new PostRepository();