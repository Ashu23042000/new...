const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class UserController {
    async signup(req, res) {

        const { name, email, level, profession, password, confirmPassword } = req.body;

        if (!name || !email || !level || !profession || !password || !confirmPassword) {
            res.status(400).json({ message: "All fields are required" });
        }

        if (password == confirmPassword) {
            try {
                const user = await userService.findUser({ email });
                if (!user) {
                    const hashPass = await userService.hashPassword(password);
                    await userService.createUser({ name, email, level, profession, password: hashPass });
                    res.status(200).json({ message: "User signup successfully" });
                }
                else {
                    res.status(400).json({ message: "Email is already registered" });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Database error" });
            }
        } else {
            res.status(400).json({ message: "Password does not match" });
        }
    }


    async login(req, res) {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
        }

        const user = await userService.findUser({ email });

        if (user) {
            
            const comparePass = await userService.comparePassword(password, user.password);

            if (comparePass) {

                const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id });

                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true
                });

                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true
                });

                res.status(200).json({ message: "Login Successful", accessToken, refreshToken });

            } else {
                res.status(400).json({ message: "Password does not match" });
            }

        } else {
            res.status(400).json({ message: "Could not find user!!!" });
        }
    }
}

module.exports = new UserController();


