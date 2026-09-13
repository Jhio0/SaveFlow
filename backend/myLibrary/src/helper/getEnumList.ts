export function getEnumList<T extends Record<string, string | number>>(
  enumObject: T,
): string {
  return Object.values(enumObject).join("\n");
}
