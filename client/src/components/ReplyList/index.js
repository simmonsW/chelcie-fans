// List of Replies to a Post

import React from 'react';
import { Link } from 'react-router-dom';

const ReplyList = ({ comments }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-light">Replies</span>
        </div>
        <div className="card-body">
            {comments &&
            comments.map(comment => (
                <p className="pill mb-3" key={comment._id}>
                {comment.commentText} {'// '}
                <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                    {comment.username} on {comment.createdAt}
                </Link>
                </p>
            ))}
        </div>
    </div>
  );
};

export default ReplyList;