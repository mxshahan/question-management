export default (data = [], params = {}) => {
  return data.filter((item) => {
    const matchedName = item.name.toLowerCase().includes(params.search ? params.search.toLowerCase() : '')
    return matchedName;
  })
}