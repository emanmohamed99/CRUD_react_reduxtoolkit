import React, { useCallback, useEffect } from "react";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts } from "../store/postSlice";
import Loading from "../components/Loading";

const Index = () => {
  const { records, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const deleteRecord = useCallback(
    (id) => {
     
      dispatch(deletePost(id));
    },
    [dispatch]
  );
  return (
    <Loading loading={loading} error={error}>
      <PostList data={records} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>
    </Loading>
  );
};

export default Index;
