const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Chat } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('friends')
          .populate({
            path: 'chats',
            populate: { path: 'users' }
          });

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('posts')
        .populate({
          path: 'chats',
          populate: { path: 'users' }
        });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('posts')
        .populate({
          path: 'chats',
          populate: { path: 'users' }
        });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: { commentText, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },
    sendMessage: async (parent, { otherUserId, commentText }, context) => {
      const userIdArr = [ otherUserId, context.user._id ];

      if (context.user) {
        const messageChat = await Chat.findOne(
          { users: userIdArr }
        );

        if (!messageChat) {
          const newChat = await Chat.create({ users: userIdArr, messages: [] });

          userIdArr.forEach(async function(userId) {
            await User.findOneAndUpdate(
              { _id: userId },
              { $push: { chats: newChat._id } },
              { new: true }
            );
          })
        }

        const sentMessageChat = await Chat.findOneAndUpdate(
          { users: userIdArr },
          { $push: { messages: { commentText, username: context.user.username } } },
          { new: true, runValidators: true }
        ).populate('users');

        return sentMessageChat;
      }

      throw new AuthenticationError('You need to be logged in');
    }
  }
};

module.exports = resolvers;