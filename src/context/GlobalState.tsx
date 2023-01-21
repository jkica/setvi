import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { Post } from '../types/PostInterface'

interface State {
    posts: Array<Post>,
    initPosts: (posts: Post[]) => void,
    createPost: (post: Post) => void,
    editPost: (post: Post) => void,
    removePost: (id: number) => void,
}

// Initial State
const initialState: State = {
    posts: [],
    initPosts: () => {},
    createPost: () => {},
    editPost: () => {},
    removePost: () => {}
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const initPosts = (posts: Post[]) => {
        dispatch({
            type: 'INIT_POSTS',
            payload: posts
        })
    }
    
    const createPost = (post: Post) => {
        dispatch({
            type: 'ADD_POST',
            payload: post
        })
    }

    const editPost =(post: Post) =>{
        dispatch({
            type: 'EDIT_POST',
            payload: post
        })
    }

    const removePost = (id: number) => {
        dispatch({
            type: 'REMOVE_POST',
            payload: id
        })
    }
    
    return (
        <GlobalContext.Provider value={{
            initPosts,
            createPost,
            editPost,
            removePost,
            posts: state.posts
        }}>
            {children}
        </GlobalContext.Provider>
    )
}