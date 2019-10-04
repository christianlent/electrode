export const makeStylesImportant = (styles) => {
  const importantStyles = {};
  Object.keys(styles).forEach((styleKey) => {
    if (typeof styles[styleKey] === "string") {
      importantStyles[styleKey] = `${styles[styleKey]} !important`;
      return;
    }
    if (typeof styles[styleKey] === "number") {
      importantStyles[styleKey] = `${styles[styleKey]}px !important`;
      return;
    }
    if (typeof styles[styleKey] === "object") {
      importantStyles[styleKey] = makeStylesImportant(styles[styleKey]);
      return;
    }
    importantStyles[styleKey] = styles[styleKey];
  });
  return importantStyles;
}

export const makeImportant = (classes) => {
  const importantClasses = {};
  Object.keys(classes).forEach((classKey) => {
    importantClasses[classKey] = makeStylesImportant(classes[classKey]);
  });
  return importantClasses;
};
