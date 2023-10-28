import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async (event: any) => {
    const formData = Object.fromEntries(await event.request.formData());

    // Verify that we have an email and a password
    if (!formData.email || !formData.password) {
      return fail(400, {
        error: 'Missing email or password'
      });
    }

    const { email, password } = formData as { email: string; password: string };

    // Create a new user
    // const { error } = await createUser(email, password);

    // If there was an error, return an invalid response
    // if (error) {
    //   return fail(500, {
    //     error
    //   });
    // }

    // Redirect to the login page
    throw redirect(302, '/login');
  }
};
