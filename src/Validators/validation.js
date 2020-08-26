export const required = (value) => {
  if (!value) return "The field is required!";
  return null;
};
 
export const maxLengthIs = (length) => {
  return (value) => {
    if (value.length > length) {
      return `Max length is ${length} item(s)`;
    }
    return null;
  };
};
