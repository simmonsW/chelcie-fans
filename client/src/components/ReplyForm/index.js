// Modal for replying to a Post

import React, { useState } from 'react';

// import { useMutation } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const ReplyForm = ({ postId }) => {
    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReply, { error }] = useMutation(ADD_COMMENT);
  
    // update state based on form input changes
    const handleChange = event => {
      if (event.target.value.length <= 280) {
        setText(event.target.value);
        setCharacterCount(event.target.value.length);
      }
    };
  
    // submit form
    const handleFormSubmit = async event => {
      event.preventDefault();
  
      try {
        await addReply({
          variables: { commentText, postId }
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
            placeholder="Leave a reply to this post..."
            value={commentText}
            className="form-input col-12 col-md-9"
            onChange={handleChange}
          ></textarea>
  
          <button id="submit-reply" className="btn col-12 col-md-3" type="submit">
            Submit
          </button>
        </form>
  
        {error && <div>Something went wrong...</div>}
      </div>
    );
};
  
export default ReplyForm;