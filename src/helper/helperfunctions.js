export function validateInput(...inputs) {
  for (const input of inputs) {
    if (input === "") return false;
  }
  return true;
}
