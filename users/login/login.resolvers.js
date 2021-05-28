import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } });

      if (!user) {
        return { ok: false, error: "User Not Found" };
      }
      // check password with args.password
      const passwordOK = await bcrypt.compare(password, user.password);

      if (!passwordOK) {
        return { ok: false, error: "Password Not Match" };
      }

      // issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      // I think jwt.sign doesn't do async task ... so no need for await keyword.

      return { ok: true, token };
    },
  },
};
