export function validPhone(phone) {
  return /^1\d{10}$/.test(phone);
}
export function validPassword(password) {
  return /^[a-zA-Z0-9]{6,16}$/.test(password);
}
