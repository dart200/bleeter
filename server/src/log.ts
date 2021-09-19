export const err = (err: Error) => {
  console.error(err.message);
  console.error(err.stack);
};