import type { PageLoad } from './$types';

export const load: PageLoad = async (opts: { fetch: any }) => {
	const url = `https://3000-viseliza-messangerts-5xdi4l2llw2.ws-eu105.gitpod.io/group/1992`;
	const response = await fetch(url);
	return await response.json();
};