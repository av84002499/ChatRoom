export const isAuthenticated = (req, res, next) => {
    const user = req.session.user;
    // res.json({ result: null, message: user });
    if (!user) {
        res.json({ result: null, user : user, message: 'Unauthorised user!!!' });
    }
    else {
        next();
    }
};

export const logOutExistingUser = (req, res, next) => {
    const user = req.session.user;
    if (user) {
        req.session.user = undefined;
    }
    next();
};