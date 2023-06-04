import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions/apiActions";
import { useNavigate } from "react-router-dom";
import { addToDetails } from "../redux/actions/detailsActions";

const HomePage = () => {
    const { loading, posts, error } = useSelector(state => state.posts);
    console.log(loading, posts, error)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    function handleCardDetails(post) {
        dispatch(addToDetails(post));
        navigate(`/item/${post.id}`);
    }

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>

    return (
        <div className="home-container">
            {posts && posts.map((post) => {
                return (
                    <div className="post" key={post.id} onClick={() => {
                        handleCardDetails(post)
                    }}>
                        <img src={`https://picsum.photos/200?random=${post.id}`} alt={post.title} />
                        <p>User ID: {post.userId}</p>
                        <h3>Title: {post.title.slice(0, 10)}...</h3>
                        <p>Body: {post.body.slice(0, 50)}</p>
                        <p>Read More...</p>
                    </div>
                )
            })}
        </div>
    )
}

export default HomePage