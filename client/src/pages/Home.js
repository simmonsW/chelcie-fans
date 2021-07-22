// Landing Page, Quote of the Day, Reviews, Submit Post, Posts Feed

import React from 'react';
import { useQuery } from '@apollo/client';
import PostList from '../components/PostList';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';
import { getFragmentQueryDocument } from '@apollo/client/utilities';


const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_POSTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);  

  const posts = data?.posts || [];
  console.log(posts);

  const loggedIn = Auth.loggedIn();

  let quoteString = "";

  /*Api Call*/
  getQuote() {

    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://dad-jokes.p.rapidapi.com/random/joke',
      headers: {
        'x-rapidapi-key': 'fd3c2bc085msh62049fe3043d594p1cd891jsn7d8a7cbcecf8',
        'x-rapidapi-host': 'dad-jokes.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      quoteString = response.data.body.setup + " " + response.data.body.punchline;
    }).catch(function (error) {
      console.error(error);
    }); 
  }
  
  getQuote();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {/* Quote of the Day */}
        <h2> Dark Room: Quote of the Day </h2>
        <div>
          {`${quoteString}`}
        </div>

        {/* Reviews */}
        {loggedIn && (
          <div className="col-12 mb-3">
            <PostForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} title="Some Feed for Post(s)..." />

          )}
        </div> 
          {loggedIn && userData ? (
            <div className="col-12 col-lg-3 mb-3">
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}        
      </div>
    </main>
  );
};

export default Home;
