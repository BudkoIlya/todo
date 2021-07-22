const maxLengthErr = 'Превышает количество символов'
const requiredErr = 'Обязательное поле'

export const validateName = (value: string) => {
  if (!value) return requiredErr;
  else if (value.length > 255) return maxLengthErr;
};
export const validateDescTask = (value: string) => {
  if (value.length > 512) return maxLengthErr;
};
export const validateDescCategory = (value: string) => {
  if (value.length > 1536) return maxLengthErr;
};
