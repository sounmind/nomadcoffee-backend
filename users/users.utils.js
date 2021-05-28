import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  if (!token) {
    console.log("ERROR: NO TOKEN");
    return null;
  }

  let user = null;

  try {
    const { id } = /* await */ jwt.verify(token, process.env.SECRET_KEY);
    user = await client.user.findUnique({ where: { id } });
  } catch (error) {
    console.log("ERROR: COULD NOT GET ID AND USER", error);
    return null;
  }

  if (user) {
    return user;
  }

  console.log("THERE IS NO USER");
  return null;
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "You should login to perform this action." };
    }

    return ourResolver(root, args, context, info);
  };
