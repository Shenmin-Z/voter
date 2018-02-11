export const roles = [
  {
    name: 'PM',
    host: true,
    vote: false
  },
  {
    name: 'Dev'
  },
  {
    name: 'QA'
  }
]

export const cardValues = [
  ...[...Array(10).keys()].map((i) => i + 1),
  '?'
]

export const pieColors = [
  '#E56F67',
  '#258E8E',
  '#6BA05D',
  '#666666',
  '#215268',
  '#FF3D46',
  '#009ED6',
  '#1B70A0',
  '#E0FF4F'
]
