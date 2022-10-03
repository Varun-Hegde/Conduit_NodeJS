import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, encrypted) => {
      if (err) return reject(err);

      resolve(encrypted);
    });
  });
};

export const matchPassword = (hash: string, password: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, hash, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};

//TESTING
/* async function test() {
    const pass = 'asdf'
    const hash = await hashPassword(pass)
    console.log("HASH:",hash); 
    const match = await matchPassword(hash,'asdf')
    console.log("Password matches:",match);
}

test(); */
