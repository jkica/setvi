const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const getAllUrl = () => `${BASE_URL}/posts`;
export const createUrl = () => `${BASE_URL}/posts`;
export const getUrl = (id: number) => `${BASE_URL}/posts/${id}`;
export const editUrl = (id: number) => `${BASE_URL}/posts/${id}`;
export const removeUrl = (id: number) => `${BASE_URL}/posts/${id}`;