import AuthService from "./auth.service.js";
import dotenv from "dotenv";
dotenv.config();

class AuthControllers {
  constructor() {}

  async loginCtrl(req, res) {
    const user = await AuthService.login(req.user);

    if (!user) return res.status(404).send({ message: "User not found" });

    req.session.user = user;

    // res.cookie(process.env.COOKIE_NAME, user.accessToken).send(user);
    res.send(user); //response without cookie
  }
}

const AuthController = new AuthControllers();

export default AuthController;
