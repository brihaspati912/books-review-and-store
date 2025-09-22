function getimgUrl(name) {
    return new URL(`../assets/${name}`, import.meta.Url)
}
export { getimgUrl }