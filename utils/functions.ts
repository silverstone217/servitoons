export const isEmptyString = (value: string) => {
  if (!value) return false;
  return value.replace(/ /g, "") === "";
};
