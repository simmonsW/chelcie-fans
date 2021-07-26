// Landing Page, Quote of the Day, Reviews, Submit Post, Posts Feed

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import PostList from '../components/PostList';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import PostForm from '../components/PostForm';

// let quoteString = "";
// var quoteObject = {};
let testString = "";

// function apiCall() {

//   // try {

//     var axios = require("axios").default;

//     var options = {
//       method: 'GET',
//       url: 'https://icanhazdadjoke.com/',
//       headers: {
//         "Accept": "text/plain"
//         // "Accept": "application/json"
//       }
//     };
    
//     axios.request(options).then(function (response) {
//       // when text/plain is accepted
//       console.log("FETCHED! " + response.data);
//       testString = response.data;
//       return testString;
  
//       // when application/json is accepted
//       // console.log("FETCHED! " + response.data.joke);
//       // quoteObject = response;
//     }).catch(function (error) {
//       console.error(error);
//     }); 

//   // } catch (e) {
//   //   console.error(e);
//   // };

// };






const Home = () => {
  const [joke, setJoke] = useState("");

  if( testString === "") {
    jokeChange();
    
  }

  function jokeChange() {
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://icanhazdadjoke.com/',
      headers: {
        "Accept": "text/plain"
        // "Accept": "application/json"
      }
    };
    
    axios.request(options).then(function (response) {
      // when text/plain is accepted
      // console.log("FETCHED! " + response.data);
      testString = response.data;
      setJoke(testString);
  
      // when application/json is accepted
      // console.log("FETCHED! " + response.data.joke);
      // quoteObject = response;
    }).catch(function (error) {
      console.error(error);
    }); 

  // } catch (e) {
  //   console.error(e);
  // };
    // apiCall();
    
  }

  // jokeChange();
  // setTimeout(jokeChange, 1000000000000000000000000);
  

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_POSTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);  

  const posts = data?.posts || [];
  // console.log(posts);

  const loggedIn = Auth.loggedIn();


  return (
    <main>

      {/* Quote of the Day */}
      <div>
        <div id="joke-of-the-day" className= "justify-center col-12 text-center">
            <h2 className= "justify-center col-12 text-center"> Dad joke Roulette! </h2>
            <h4 className= "justify-center col-12 text-center">
              {joke}
            </h4>
        </div>
      </div>

      <div className="flex-row justify-space-between">
  


        {/* Reviews */}
        <h3 className= "justify-center col-12 text-center review"> "Revolutionary" - New York Times </h3>
        <h3 className= "justify-center col-12 text-center review"> "Mediocre" - PawPals </h3>

        {loggedIn && (
          <div className="col-12 mb-3">
            <PostForm />
          </div>
        )}
        <div id="postlist-component" className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} title="Chelcie Feed" />

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
