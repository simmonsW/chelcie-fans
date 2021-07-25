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
let testString = "test text";

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
  const [joke, setJoke] = useState("test text");

  if( testString === "test text") {
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
      console.log("FETCHED! " + response.data);
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
  console.log(posts);

  const loggedIn = Auth.loggedIn();


  return (
    <main>
      <div className="flex-row justify-space-between">
        {/* Quote of the Day */}
        <h2 className= "justify-center-md"> Dad Joke of the Day </h2>
        <div className= "justify-center-md">
          {/* {`${quoteObject}`} */}
          {joke}

        </div>

        {/* Reviews */}
        <h3 className= "justify-center-md"> "Revolutionary" - New York Times </h3>
        <h3 className= "justify-center-md"> "Mediocre" - PawPals </h3>

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
