export function AuthPermission(req, res, next) {
    return next();
    res.redirect('/api/v1/404');
}
