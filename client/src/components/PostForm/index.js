// Submit a post

import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
    const [postText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { posts } = cache.readQuery({ query: QUERY_POSTS });
            cache.writeQuery({
              query: QUERY_POSTS,
              data: { posts: [addPost, ...posts] }
            });
          } catch (e) {
            console.error(e);
          }
      
          // update me object's cache, appending new post to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, posts: [...me.posts, addPost] } }
          });
        }
      });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add post to database
          await addPost({
            variables: { postText: postText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
    };

    return (
    <div>
        <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
        >
            <textarea
            placeholder="Here's a new post..."
            value={postText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
            ></textarea>
        <button id="submit-post" className="btn col-12 col-md-3" type="submit">
            Submit
        </button>
        </form>
    </div>
    );
};

export default PostForm;