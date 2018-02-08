export const roles = [
  {
    name: 'PM',
    perm: 0
  },
  {
    name: 'Dev',
    perm: 1
  },
  {
    name: 'QA',
    perm: 1
  }
]

export const cardValues = [
  ...[...Array(10).keys()].map((i) => i + 1),
  '?'
]
