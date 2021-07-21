const { AuthenticationError } = require('apollo-server-express');
const { User, Customer, Category, Print, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    prints: async () => {
      return await Print.find();
    },
    products: async (parent, {category, name}) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category').populate('print');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category').populate('print');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(_id);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    orders: async () => {
      return await Order.find().populate('product');
    },
    order: async (parent, { _id }) => {
      return await Order.findById(_id).populate('product');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const { products } = await order.populate('products').execPopulate();

      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          product: product.id,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].print.price * 100,
          currency: 'usd'
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCustomer: async (parent, args) => {
      const customer = await Customer.create(args);

      return customer;
    },
    // addOrder: async (parent, { products }, context) => {
    //   if (context.customer) {
    //     const order = new Order({ products });

    //     await Customer.findOneAndUpdate({ context.customer._id, { $push: { orders: order } } });

    //     return order;
    //   }

    //   throw new AuthenticationError('no customer set up');
    // },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    }
  }
}

module.exports = resolvers;