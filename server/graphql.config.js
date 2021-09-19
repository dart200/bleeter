module.exports = {
  projects: {
      app: {
          schema: ["./src/gql/schema.ts"],
          documents: ["**/*.{graphql,js,ts,jsx,tsx}"],
      }
  }
}