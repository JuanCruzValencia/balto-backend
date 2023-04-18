import passport from "passport";
import passportJWT from "passport-jwt";
import userModel from "../../models/users.model.ts";
import dotenv from "dotenv";
import { User } from "../../interface/interfaces.ts";

dotenv.config();
const JwtStrategy = passportJWT.Strategy;
const JwtExtractor = passportJWT.ExtractJwt;

const initializeJwtPassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: JwtExtractor.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async function (jwtPayload, done) {
        return done(null, jwtPayload);
      }
    )
  );

  passport.serializeUser(function (user: Partial<User>, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userModel.findOne({ _id: id }).lean().exec();

    done(null, user);
  });
};

export default initializeJwtPassport;
