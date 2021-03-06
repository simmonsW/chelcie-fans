// Single post and its replies in cascade

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import { REMOVE_POST } from '../utils/mutations';
import ReplyList from '../components/ReplyList';
import ReplyForm from '../components/ReplyForm';
import Auth from '../utils/auth';
import { BiTrash } from 'react-icons/bi';


const SinglePost = props => {
  const { id: postId } = useParams();
  // console.log(postId);
  const [removePost] = useMutation(REMOVE_POST);

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });
  
  const post = data?.post || {};

  let userPost = false;

  const userPostCheck = function() {
    if (Auth.loggedIn()) {
      const currentUser = Auth.getProfile().data.username;
      // console.log(currentUser);

      if (currentUser === post.username) {
        return userPost = true;
      } else {
        return userPost = false;
      }
    } else {
      return userPost = false;
    }
  };

  if (!loading) {
    userPostCheck();
    // console.log(userPost);
  };

  const handleClick = async () => {
    try {
      await removePost({
        variables: { postId: post._id }
      })
        .then(
          window.location.href = `/profile/${post.username}`
        );
    } catch(e) {
      console.error(e);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
    
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
        {userPost === true && (
          <button className="trash-post" onClick={handleClick}><BiTrash /></button>
        )}
          <span style={{ fontWeight: 700 }} className="text-light">
            {post.username}
          </span>{' '}
          post on {post.createdAt}
        </p>{' '}
        <div className="card-body">
          <p>{post.postText}</p>
        </div>
      </div>

      {post.commentCount > 0 && <ReplyList comments={post.comments} />}
      {Auth.loggedIn() && <ReplyForm postId={post._id} />}
    </div>
  );
};

export default SinglePost;
