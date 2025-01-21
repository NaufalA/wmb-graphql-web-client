export function getField<T, K extends keyof T>(
  obj: T,
  fieldName: string
): T[K] | string {
  if (obj) {
    return obj[fieldName as K];
  }
  return '';
}