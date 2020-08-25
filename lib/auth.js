const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const exempted_url = process.env.EXEMPTED_URL;
    console.log(exempted_url, req.url);
    if (req.url === exempted_url) {
        console.log('herer');
        return next();
    }
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied! No token provided');
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('Invalid token');
    }
}
// module.exports = auth;