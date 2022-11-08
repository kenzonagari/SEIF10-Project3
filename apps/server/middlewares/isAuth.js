// user do something -> auth middleware (is user authorized) -> next
// MIDDLEWARE
const isAuth = (req, res, next) => {
    try {
        if (req.session.isAuth){
            next();
        } else {
            // res.json({ msg: "Not Authorized!" });
            res.status(401).json({ msg: "Not Authorized!" });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }  
};

module.exports = isAuth;