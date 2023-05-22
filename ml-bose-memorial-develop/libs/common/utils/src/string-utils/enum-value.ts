import { isNilOrEmpty } from '../validators';

export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue?: string,
): keyof T | null {
  if (isNilOrEmpty(enumValue)) return null;

  const enumKey = Object.keys(myEnum).find((x) => myEnum[x] == enumValue);

  if (isNilOrEmpty(enumKey)) return null;

  return enumKey;
}
