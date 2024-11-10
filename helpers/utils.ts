export const fixNumericalFields = <T extends object>(
  obj: T,
  numericalFields: (keyof T)[]
) => {
  const fixedObj = { ...obj };

  numericalFields.forEach((field) => {
    if (typeof fixedObj[field] === "string") {
      fixedObj[field] = Number(fixedObj[field]) as any;
    }
  });

  return fixedObj;
};

export const capitalize = (str: string) => {
  const words = str.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};
