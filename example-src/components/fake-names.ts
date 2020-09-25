import faker from "faker";

export const generate = (num: number): string[] =>
  new Array<string>(num).fill("").map(() => faker.name.firstName());
