import passport from "passport";
import passportLocal from "passport-local";
import userModel from "../../models/users.model.js";
import CartsService from "../../carts/carts.services.js";
import AuthService from "../auth.service.js";
import { validateNewUser } from "../../utils.js";
import dotenv from "dotenv";

dotenv.config();
const LocalStrategy = passportLocal;

const initializeLocalPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async function (req, username, password, done) {
        const user = await userModel.findOne({ email: username }).lean().exec();

        if (user) return done(null, false);

        const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          age: req.body.age,
          password: await userModel.encryptPassword(password),
          cart: await CartsService.createCart(),
        };

        if (!validateNewUser(newUser)) {
          return done(null, false);
        }

        const createNewUser = await userModel.create(newUser);

        return done(null, createNewUser);
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const user = await AuthService.validateUser(username, password);

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      }
    )
  );
};

export default initializeLocalPassport;
