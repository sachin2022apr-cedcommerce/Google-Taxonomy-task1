export const useFetch = () => {
  async function fetchData(s) {
    // console.log();
    const result = await fetch('./data.txt')
    return await result.text()
  }
  return { fetchData }
}

