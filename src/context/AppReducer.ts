import { Post } from '../types/PostInterface';

export default (
    state: { posts: Post[] },
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case 'INIT_POSTS':
            return {
                ...state,
                posts: action.payload
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case 'EDIT_POST':
            const updatePost = action.payload;

            const updatePosts = state.posts.map(post => {
                if (post.id === updatePost.id) {
                    return updatePost;
                }
                return post;
            })
            return {
                ...state,
                posts: updatePosts
            }
        case 'REMOVE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => {
                    return post.id !== action.payload;
                })
            }

        default:
            return state;
    }
}