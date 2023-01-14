export function chainable() {
  return a;
}

function a<T>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
): any {
  return target;
}
