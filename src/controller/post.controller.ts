import {NextFunction, Request, Response} from 'express';
import {UpdateResult} from 'typeorm';

import {IPost} from '../entity';
import {IRequestExtended} from '../interfaces';
import {postService} from '../services';

class PostController {
    public async createPost(req: IRequestExtended, res: Response, next: NextFunction): Promise<Response<IPost | Error> | undefined> {
        try {
            const post = {
                ...req.body,
                userId: req.user?.id,
            };
            const createdPost = await postService.createPost(post);
            return res.json(createdPost);
        } catch (e: any) {
            next(e);
        }
    }

    public async getUserPosts(req: Request, res: Response, next: NextFunction): Promise<Response<IPost[] | Error> | undefined> {
        try {
            const {userId} = req.params;
            const posts = await postService.getUserPosts(userId);
            return res.json(posts);
        } catch (e: any) {
            next(e);
        }
    }

    public async updatePost(req: Request, res: Response, next: NextFunction): Promise<Response<UpdateResult | Error> | undefined> {
        try {
            const {
                title,
                text,
            } = req.body;
            const {postId} = req.params;
            const updatedPost = await postService.updatePost(postId, title, text);
            return res.json(updatedPost);
        } catch (e: any) {
            next(e);
        }
    }
}

export const postController = new PostController();