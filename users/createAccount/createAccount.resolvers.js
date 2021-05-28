import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      root,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });

      if (existingUser) {
        throw new Error("This username/email is already taken.");
      }

      const uglyPassword = await bcrypt.hash(password, 10);

      try {
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return { ok: false, error: e.message };
      }

      return { ok: true };
    },
  },
};
