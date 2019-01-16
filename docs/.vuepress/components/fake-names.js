import faker from 'faker'

export const generate = num => new Array(num).fill('').map(faker.name.firstName)
