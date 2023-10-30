import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as jwt from 'jsonwebtoken';
import isExistUser from '$lib/ts/isExistUser';
import User from '$lib/ts/User';

export interface User {
	login: string,
	password: string
}

const JWT_ACCESS_TOKEN = "d7a428bc721a2e90e5dce093933c5199aa7adadc11c04cdabceb282897d4a2bf";

export async function load(opts: { locals: any }) {
	if (opts.locals.user)
		throw redirect(302, '/')
}

export const actions: Actions = {
	default: async (event: any) => {
		const formData = Object.fromEntries(await event.request.formData());

		// Verify that we have an login and a password
		if (!formData.login || !formData.password) {
			return fail(400, {
				error: 'Missing login or password'
			});
		}
		const user: User = formData as { login: string; password: string };

		if (!await isExistUser(user.login, user.password))
			return fail(400, { error: 'Неравильный логин или пароль. Попробуйте еще раз' });
		
		const fio = await isExistUser(user.login, user.password) as { firstName: string; lastName: string; midName: string }
		
		const user_token: JSON = JSON.parse(await User(user, fio.firstName, fio.lastName, fio.midName));

		const token = jwt.sign(user_token, JWT_ACCESS_TOKEN, {
			expiresIn: '1d'
		});

		event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day	
		 });
	
		// Redirect to the home page
		throw redirect(302, '/');
	}
};
