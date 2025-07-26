const router = require("express").Router();
const userController = require("../Controllers/UserController");

// Example route
router.get("/", (req, res) => {
    res.status(200).json({ message: "User route is working" });
})


// User registration route
router.post("/register", userController.registerUser);  


module.exports = router;