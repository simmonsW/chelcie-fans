import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      username
      email
      friendCount
      posts {
        _id
        postText
        createdAt
        username
        commentCount
        comments {
          _id
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      email
      friendCount
      friends {
        _id
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      email
      friendCount
      friends {
        _id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($otherUserId: ID!, $commentText: String!) {
    sendMessage(otherUserId: $otherUserId, commentText: $commentText) {
      _id
      users {
        _id
      }
      messageCount
      messages {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;