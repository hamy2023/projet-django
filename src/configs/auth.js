export default {
  meEndpoint: 'http://localhost:8000/auth/users/me',
  loginEndpoint: 'http://localhost:8000/auth/jwt/create',
  registerEndpoint: 'http://localhost:8000/auth/users/',
  storageTokenKeyName: 'access',
  onTokenExpiration: 'refresh' // logout | refreshToken
}
