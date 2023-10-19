import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

const validUsername = 'Hagar';
const validPassword = bcrypt.hashSync('terrível', SALT_ROUNDS);

const noPasswordLoginBody = { username: validUsername };
const noUsernameLoginBody = { password: validPassword }
const invalidUsernameOrPassword = { username: 'juvenal', password: 'jubileu' }

export default {
  noPasswordLoginBody,
  noUsernameLoginBody,
  invalidUsernameOrPassword
}