import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { Post } from '../constants/PostInterface'

interface State {
    posts: Array<Post>,
    initPosts: (posts: Post[]) => void,
    addPost: (post: Post) => void | null,
    editPost: (post: Post) => void | null,
    removePost: (id: number) => void | null,
}

// Initial State
const initialState: State = {
    posts: [],
    initPosts: () => {},
    addPost: () => {},
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
    
    const addPost = (post: Post) => {
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
            addPost,
            editPost,
            removePost,
            posts: state.posts
        }}>
            {children}
        </GlobalContext.Provider>
    )
}