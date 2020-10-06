export const requiredField = (value: string): string | null => {
  if (!value) return "The field is required!";
  return null;
};

export const maxLengthIs = (length: number) => {
  return (value: string): string | null => {
    if (value.length > length) {
      return `Max length is ${length} symbol(s)`;
    }
    return null;
  };
};
