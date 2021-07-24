// Page with Friends, Posts

import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import FriendList from '../components/FriendList';


import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import PostForm from '../components/PostForm';




const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }  

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { friendId: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}

      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList posts={user.posts} title={`${user.username}'s posts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <PostForm />}</div>
    </div>
  );
};

export default Profile;
