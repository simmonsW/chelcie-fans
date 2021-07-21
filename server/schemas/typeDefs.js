const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type Post {
    _id: ID
    PostText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
    comments: [Comment]
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    Posts: [Post]
    friends: [User]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(PostId: ID!, commentBody: String!): Post
    addReply(PostId: ID!, CommentId: ID!, commentBody: String!): Post
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;