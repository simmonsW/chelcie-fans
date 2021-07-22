import { gql } from '@apollo/client';

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_CHATS = gql`
  {
    me {
      _id
      username
      email
      chats {
        _id
        users {
          _id
          username
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
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      posts {
        _id
        postText
        createdAt
        commentCount
        comments {
          _id
          commentText
          createdAt
          username
        }
      }
      friends {
        _id
        username
      }
      chats {
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
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      posts {
        _id
        postText
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentText
      }
    }
  }
`;