import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/User";

export const sign = async (user: UserAttributes) => {
  const JWT_SECRET = "qemsaslvjd-33r3:9i9vis3.";
  return new Promise<string | void>((resolve, reject) => {
    jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      (err: Error | null, token?: string) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};

export const decode = async (token: string) => {
  const JWT_SECRET = "qemsaslvjd-33r3:9i9vis3.";
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

//TESTING
/* const test = async () => {
    const data = {
        username: 'Varun',
        email:' varun'
    }
    const token = await sign(data)
    console.log("token is:",token);
    const decoded = await decode(token)
    console.log("DEcoded:",decoded);
}

test() */
