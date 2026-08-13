import axios from 'axios'
const baseUrl = 'http://localhost:3001/users'

const login = async credentials => {
  const response = await axios.get(baseUrl, {
    params: { username: credentials.username }
  })

  const user = response.data[0]

  if (!user || user.password !== credentials.password) {
    throw new Error('wrong credentials')
  }

  return {
    username: user.username,
    name: user.name,
    token: 'local-dev-token'
  }
}

export default { login }