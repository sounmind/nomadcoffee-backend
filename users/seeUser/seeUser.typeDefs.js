import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }

  type SeeFollowersQuery {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }

  type Query {
    seeFollowing(username: String!, lastId: Int!): SeeFollowingResult!
    seeFollowers(username: String!, page: Int!): SeeFollowersQuery!
  }
`;
