import { Request, Response } from "express";
import UserDto from "../users/dto/user.dto";
import { UserSession } from "../interface/interfaces";

//TODO endpoint not implemented on next
export const getChatPage = async (req: Request, res: Response) => {
  try {
    //As user is not logged for this view cant access to the object
    //The idea for this view is only show how to work with handlebars

    // const sessionUser = { ...req.user } as UserSession;
    // if (!sessionUser)
    //   return res.status(404).send({ message: "User Not Found" });

    // const user = new UserDto(sessionUser.user._doc) || { first_name: "Juan" };

    res.render("chat", {
      style: "style.css",
      user: { first_name: "Juan" },
    });
  } catch (error) {
    req.logger.error(error);

    res.send({
      succes: false,
      error,
    });
  }
};
