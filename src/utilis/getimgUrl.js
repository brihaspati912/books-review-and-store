function getImgUrl(name) {
    return new URL(`../assets/${name}`, import.meta.Url)
}
export { getImgUrl }

//32min