export async function load(opts: { locals: any }) {
    return { user: opts.locals.user }
}