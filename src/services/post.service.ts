import {UpdateResult} from 'typeorm';

import {IPost} from '../entity';
import {postRepository} from '../repositories';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return postRepository.createPost(post);
    }

    public async getUserPosts(id: string): Promise<IPost[]> {
        return postRepository.getUserPosts(+id);
    }

    public async updatePost(id: string, title: string, text: string): Promise<UpdateResult> {
        return postRepository.updatePost(+id, title, text);
    }

    public async getUserPostByParams(filteredObject: Partial<IPost>): Promise<IPost | undefined> {
        return postRepository.getUserPostByParams(filteredObject);
    }
}

export const postService = new PostService();