import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import * as jwt from 'jsonwebtoken';

interface Profile {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  father_name?: string;
  theme?: Theme;
  role?: Role;
  user_id?: number;
  group_id: number;
}

enum Role {
  STUDENT,
  TEACHER
}

enum Theme {
  white,
  black
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
      
      const profile = await (await fetch(`http://localhost:3000/profile/${jwtUser.user_id}`)).json()
      
      const sessionProfile: Profile = {
        id: jwtUser.id,
        email: jwtUser.email,
        first_name: jwtUser.first_name,
        last_name: jwtUser.last_name,
        father_name: jwtUser.father_name,
        theme: profile.theme,
        role: jwtUser.role,
        user_id: jwtUser.user_id,
        group_id: jwtUser.group_id,
      };
     
      event.locals.user = sessionProfile;
    } catch (error) {
      console.error(error);
    }
  }

  return await resolve(event);
};