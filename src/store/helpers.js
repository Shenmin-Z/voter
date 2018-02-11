export const avg = (votes) => votes.map(v => v.vote)
  .filter(Number.isInteger)
  .reduce((acc, i) => acc + i) / votes.length

export const count = (votes) => {
  const obj = votes.map(v => v.vote)
    .filter(Number.isInteger)
    .reduce((acc, i) => {
      acc[i] ? acc[i]++ : acc[i] = 1
      return acc
    }, {})
  return Object.keys(obj).map(i => ({
    value: i,
    count: obj[i]
  })).sort((a, b) => b.count - a.count)
}

export const total = (votes) => votes.map(v => v.vote)
  .filter(Number.isInteger)
  .reduce((acc) => acc + 1, 0)
