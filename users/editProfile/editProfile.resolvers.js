import client from "../../client";
import bcrpyt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFunc = async (
  root,
  {
    username,
    email,
    name,
    location,
    avatarURL,
    githubUsername,
    password: newPassword,
  },
  { loggedInUser },
  info
) => {
  let uglyPassword = null;

  if (newPassword) {
    uglyPassword = await bcrpyt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      name,
      location,
      avatarURL,
      githubUsername,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });

  if (updatedUser.id) {
    return { ok: true };
  }

  return { ok: false, error: "Could not update profile." };
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFunc),
  },
};
