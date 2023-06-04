import * as types from "./actionTypes"
import axios from "axios"


export const fetchPostsRequest = () => ({
    type: types.FETCH_POSTS_REQUEST
})

export const fetchPostsSuccess = (posts) => ({
    type: types.FETCH_POSTS_SUCCESS,
    payload: posts
})

export const fetchPostsFailure = (error) => ({
    type: types.FETCH_POSTS_FAILURE,
    payload: error
})


export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(fetchPostsRequest())
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                dispatch(fetchPostsSuccess(response.data))
                // console.log("Api posts are:", response.data)
            })
            .catch(error => dispatch(fetchPostsFailure(error)))
    }
}