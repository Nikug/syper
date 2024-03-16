const repositoryUrl = 'https://api.github.com/repos/nikug/syper/commits/main'

export const getLatestCommit = async () => {
  const response = await fetch(repositoryUrl)
  const json = await response.json()
  return json?.sha
}
