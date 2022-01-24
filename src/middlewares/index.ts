import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../entity";

require("dotenv").config();
/**
 * 헤더에서 AccessToken을 추출한다.
 * @param req
 */
export const extractAccessToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};
/**
 * JWT AccessToken을 체크한다.
 * @param req
 * @param res
 * @param next
 */
export const checkAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = extractAccessToken(req);
  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_USER_KEY);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(401).send({ error: true, message: "토큰 에러" });
  }

  next();
};

/**
 * JWT AccessToken을 만든다.
 * @param admin
 */
export const generateAccessToken = (user: User) => {
  return jwt.sign(
    {
      sub: user.id,
      idf: user.email,
    },
    process.env.JWT_USER_KEY
  );
};
