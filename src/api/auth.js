const ACCESS_KEY  = 'bella_shop_access'
const REFRESH_KEY = 'bella_shop_refresh'
const USER_KEY    = 'bella_shop_user'

export function saveAuth({ access, refresh, user }) {
  localStorage.setItem(ACCESS_KEY, access)
  localStorage.setItem(REFRESH_KEY, refresh)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function isAuthenticated() {
  return !!getAccessToken()
}

export function logout() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(USER_KEY)
}

// Ajoute automatiquement le header Authorization: Bearer <token> à une requête fetch
export async function authFetch(url, options = {}) {
  const token = getAccessToken()
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  return fetch(url, { ...options, headers })
}