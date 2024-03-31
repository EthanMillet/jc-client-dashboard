const { AuthenticationError } = require('apollo-server-express');
const { User, DataPoint, Reference } = require('../models')
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findOne({_id: context.user._id}).populate(
                [{path: 'dataPoints', strictPopulate: false}]
              )
              return user;
            }
              throw new AuthenticationError('Not logged in');
            },
        dataPoint: async(parent,{_id}) => {
          return await DataPoint.findById(_id).populate(
            [{path: 'references', strictPopulate: false}
          ])},
        reference: async(parent,{_id}) => {
          return await Reference.findById(_id)
        },
    },
    Mutation: {
        addUser: async (parent, args, context) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
          },
        addDataPoint: async (parent, args, context) => {
          if (context.user) {
            const dataPoint = await DataPoint.create(args);

            await User.findOneAndUpdate(
              {_id: context.user._id},
              {$push: {dataPoints: dataPoint}})
              return dataPoint;
          }
        },
        addReference: async (parent, args, context) => {
          if (context.user) {
          const reference = await Reference.create(args);
          await DataPoint.findOneAndUpdate(
            {_id: args.conceptID},
            {$push: {references: reference.id}}
          )
          return reference;
        }
        },

        deleteDataPoint: async(parent, args, context) => {
          if (context.user) {
            await DataPoint.findOneAndDelete({_id, userId: context.user._id});
            await User.findByIdandUpdate(context.user._id, {$pull: { datapoints: _id }});
            return _id;
          }
          throw new AuthenticationError('Not logged in');
        },
        deleteReference: async(parent, args, context) => {
          if (context.user) {
            await Reference.findOneAndDelete({_id, userId: context.user._id});
          }
        },
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
          }
    },
};

module.exports = resolvers;