// Page with Friends, Posts

import React, { useEffect, useRef } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import PostList from '../components/PostList';
import FriendList from '../components/FriendList';


import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_ME_BASIC } from '../utils/queries';

import Auth from '../utils/auth';

import PostForm from '../components/PostForm';




const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const { username: userParam } = useParams();
  const mountedRef = useRef(true);
  let loggedInFriends = [];
  let thisUser;

  const userProfile = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  useEffect(() => {
    return () => {
      console.log('cleanup');
      mountedRef.current = false;
    }
  }, [])

  // Get logged in user's friends array
  const LoggedInUser = function() {
    thisUser = useQuery(QUERY_ME_BASIC, {
      variables: { username: Auth.getProfile().data.username },
    });

    if (thisUser.loading) {
      console.log('fetching your friend list');
    };

    loggedInFriends = thisUser.data?.me.friends;
    return { thisUser, loggedInFriends };
  }

  // check if user is logged in or not
  if (Auth.loggedIn()) {
    LoggedInUser();
  };

  const user = userProfile.data?.me || userProfile.data?.user || {};
  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (userProfile.loading) {
    return <div>Loading...</div>;
  }

  // check if this user is in logged in user's friend array
  const friends = function() {
    if (!thisUser.loading) {
      if (loggedInFriends.some(friend => friend._id === user._id)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleClick = async () => {
    if (friends() === true) {
      try {
        await removeFriend({
          variables: { friendId: user._id }
        });
        if (!mountedRef.current) return null;
      } catch(e) {
        console.error(e);
      };
    } else {
      try {
        await addFriend({
          variables: { friendId: user._id }
        });
        if (!mountedRef.current) return null;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 id="viewing-profile" className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && Auth.loggedIn() && (
          <button id="add-friend-btn" className="btn ml-auto" onClick={handleClick}>
            {friends() ? 'Unfriend' : 'Add Friend'}

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
