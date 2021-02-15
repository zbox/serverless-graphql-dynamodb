const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getTaskById = async id => {
  try {
    const data = await dynamoDb.get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
    }).promise()
    return data.Item.stage
  } catch (err) {
    console.log("Error ", err.message)
  }
}

const modifyStage = async (id, stage) =>  {
  try {
    await dynamoDb.update({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { id },
      UpdateExpression: 'SET stage = :stage',
      ExpressionAttributeValues: {
        ':stage': stage,
      },
    }).promise()
    return stage
  } catch (err) {
    console.log("Error ", err.message)
  }

}

module.exports = {
  Query: {
    taskById: (_, args) => getTaskById(args.id),
  },
  Mutation: {
    modifyStage: (_, args) => modifyStage(args.id, args.stage),
  },
}
