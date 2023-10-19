import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const validUsername = 'Hagar';
const validPassword = 'terrível';

const noPasswordLoginBody = { username: validUsername };
const noUsernameLoginBody = { password: validPassword };
const invalidUsernameOrPassword = { username: 'juvenal', password: 'jubileu' };
const validUsernameAndPassword = { username: validUsername, password: validPassword };
const token = { token: 'asdfadsfasdfasdfadf' };
const existingUser = { username: validUsername, vocation: 'ann', level: 10, password: bcrypt.hashSync(validPassword, SALT_ROUNDS) }

export default {
  noPasswordLoginBody,
  noUsernameLoginBody,
  invalidUsernameOrPassword,
  validUsernameAndPassword,
  token,
  existingUser,
}