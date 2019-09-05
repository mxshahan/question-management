export const UserFilter = (data = [], params = {}) => {
  return data.filter((item) => {
    const matchedName = item.name.toLowerCase().includes(params.search ? params.search.toLowerCase() : '')
    return matchedName;
  })
}

export const formatImage = (image = '') => {
  if (image.includes('https://') || image.includes('http://')) {
    return image;
  } else {
    return `${window.location.protocol}//${window.location.host}/uploads/${image}`;
  }
}