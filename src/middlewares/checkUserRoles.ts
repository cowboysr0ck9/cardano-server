import { Request, Response, NextFunction } from "express";

/**
 * Middleware function to to check whether or not a valid user has permission to
 * utilize a respective route tht adopts this middleware.
 * @param roles Array of string representing different User Roles for an application
 */
export const checkUserRole = (roles: IGlobalUserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    //Get the user ID from previous midleware
    // const id = res.locals.jwtPayload.userId;
    //Get user role from the database
    // const userRepository = getRepository(User);
    // let user: User;
    // try {
    //   user = await userRepository.findOneOrFail(id);
    // } catch (id) {
    //   res.status(401).send();
    // }
    //Check if array of authorized roles includes the user's role
    // if (roles.indexOf(user.role) > -1) next();
    // else
    //   res.status(401).json({
    //     errors: {
    //       message: "Your current role is unauthorized for this activity.",
    //     },
    //   });
  };
};

enum IGlobalUserRoles {
  ADMIN = "ADMIN",
  ANALYST = "ANALYST",
  REPORTING = "REPORTING",
  SUPER_ADMIN = "SUPER_ADMIN",
  SERVICE_ACCT = "SERVICE_ACCT",
}
checkUserRole([IGlobalUserRoles.ANALYST]);
