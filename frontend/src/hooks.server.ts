import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import * as jwt from 'jsonwebtoken';

export interface SessionUser {
  id: number;
  login: string;
  password: string;
}

const JWT_ACCESS_TOKEN = "d7a428bc721a2e90e5dce093933c5199aa7adadc11c04cdabceb282897d4a2bf";

export const handle: Handle = async ({ event, resolve }) => {
  const { headers } = event.request;
  const cookies = parse(headers.get("cookie") ?? "");

  if (cookies.AuthorizationToken) {
    // Remove Bearer prefix
    const token = cookies.AuthorizationToken.split(" ")[1];

    try {
      const jwtUser = jwt.verify(token, JWT_ACCESS_TOKEN);

      if (typeof jwtUser === "string") {
        throw new Error("Something went wrong");
      }

      const user = await (await fetch(`http://localhost:3000/${jwtUser.login}`)).json()

      if (!user) {
        throw new Error("User not found");
      }

      const sessionUser: SessionUser = {
        id: user.id,
        login: user.login,
        password: user.password
      };

      event.locals.user = sessionUser;
    } catch (error) {
      console.error(error);
    }
  }

  return await resolve(event);
};