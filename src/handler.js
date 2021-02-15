const { graphql } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const taskDef = require('./typedef');
const taskRes = require('./resolver');

const taskSchema = makeExecutableSchema({
    typeDefs: taskDef,
    resolvers: taskRes
});

module.exports.query = (event, context, callback) =>
    graphql(taskSchema, event.queryStringParameters.query)
        .then(
            result => callback(null, { statusCode: 200, body: JSON.stringify(result) }),
            err => callback(err)
        );
