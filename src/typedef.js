module.exports = `
    type Task {
      id: String
      stage: String
    }

    type Query {
      taskById(id: String): String
    }
  
    type Mutation {
      modifyStage(
        id: String!
        stage: String!
      ): String
    }
  `;
