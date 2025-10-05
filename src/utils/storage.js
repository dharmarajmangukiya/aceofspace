"use client";

// Storage key constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
  REMEMBER_ME: "rememberMe",
};

// Storage types
export const STORAGE_TYPES = {
  LOCAL: "localStorage",
  SESSION: "sessionStorage",
};

export const getFromStorage = (key, type = STORAGE_TYPES.LOCAL) => {
  if (typeof window === "undefined") return null;

  try {
    const storage =
      type === STORAGE_TYPES.LOCAL ? localStorage : sessionStorage;
    return storage.getItem(key);
  } catch (error) {
    console.error(`Error getting ${key} from ${type}:`, error);
    return null;
  }
};

export const setToStorage = (key, value, type = STORAGE_TYPES.LOCAL) => {
  if (typeof window === "undefined") return false;

  try {
    const storage =
      type === STORAGE_TYPES.LOCAL ? localStorage : sessionStorage;
    storage.setItem(key, value);

    // 🚀 Trigger custom event when auth token changes
    if (key === STORAGE_KEYS.AUTH_TOKEN) {
      window.dispatchEvent(new Event("authChange"));
    }

    return true;
  } catch (error) {
    console.error(`Error setting ${key} in ${type}:`, error);
    return false;
  }
};

export const removeFromStorage = (key, type = STORAGE_TYPES.LOCAL) => {
  if (typeof window === "undefined") return false;

  try {
    const storage =
      type === STORAGE_TYPES.LOCAL ? localStorage : sessionStorage;
    storage.removeItem(key);

    // 🚀 Trigger custom event when auth token is removed
    if (key === STORAGE_KEYS.AUTH_TOKEN) {
      window.dispatchEvent(new Event("authChange"));
    }

    return true;
  } catch (error) {
    console.error(`Error removing ${key} from ${type}:`, error);
    return false;
  }
};

export const clearStorage = (type = STORAGE_TYPES.LOCAL) => {
  if (typeof window === "undefined") return false;

  try {
    const storage =
      type === STORAGE_TYPES.LOCAL ? localStorage : sessionStorage;
    storage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing ${type}:`, error);
    return false;
  }
};

export const getFromAnyStorage = (key) => {
  return (
    getFromStorage(key, STORAGE_TYPES.LOCAL) ||
    getFromStorage(key, STORAGE_TYPES.SESSION)
  );
};

export const removeFromAnyStorage = (key) => {
  const localRemoved = removeFromStorage(key, STORAGE_TYPES.LOCAL);
  const sessionRemoved = removeFromStorage(key, STORAGE_TYPES.SESSION);
  return localRemoved || sessionRemoved;
};

export const getJSONFromStorage = (key, type = STORAGE_TYPES.LOCAL) => {
  const value = getFromStorage(key, type);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing JSON for ${key}:`, error);
    return null;
  }
};

export const setJSONToStorage = (key, value, type = STORAGE_TYPES.LOCAL) => {
  try {
    const jsonValue = JSON.stringify(value);
    return setToStorage(key, jsonValue, type);
  } catch (error) {
    console.error(`Error stringifying JSON for ${key}:`, error);
    return false;
  }
};

export const getJSONFromAnyStorage = (key) => {
  return (
    getJSONFromStorage(key, STORAGE_TYPES.LOCAL) ||
    getJSONFromStorage(key, STORAGE_TYPES.SESSION)
  );
};

export const authStorage = {
  getAuthToken: () => getFromAnyStorage(STORAGE_KEYS.AUTH_TOKEN),

  getRefreshToken: () => getFromAnyStorage(STORAGE_KEYS.REFRESH_TOKEN),

  getUserData: () => getJSONFromAnyStorage(STORAGE_KEYS.USER_DATA),

  isRememberMe: () =>
    !!getFromStorage(STORAGE_KEYS.REMEMBER_ME, STORAGE_TYPES.LOCAL),

  setAuthToken: (token, rememberMe = false) => {
    const type = rememberMe ? STORAGE_TYPES.LOCAL : STORAGE_TYPES.SESSION;
    return setToStorage(STORAGE_KEYS.AUTH_TOKEN, token, type);
  },

  setRefreshToken: (token, rememberMe = false) => {
    const type = rememberMe ? STORAGE_TYPES.LOCAL : STORAGE_TYPES.SESSION;
    return setToStorage(STORAGE_KEYS.REFRESH_TOKEN, token, type);
  },

  setUserData: (userData, rememberMe = false) => {
    const type = rememberMe ? STORAGE_TYPES.LOCAL : STORAGE_TYPES.SESSION;
    return setJSONToStorage(STORAGE_KEYS.USER_DATA, userData, type);
  },

  setTokens: (authToken, refreshToken, rememberMe = false) => {
    const authSuccess = authStorage.setAuthToken(authToken, rememberMe);
    const refreshSuccess = authStorage.setRefreshToken(
      refreshToken,
      rememberMe
    );
    return authSuccess && refreshSuccess;
  },

  setRememberMe: (rememberMe) => {
    if (rememberMe) {
      return setToStorage(
        STORAGE_KEYS.REMEMBER_ME,
        "true",
        STORAGE_TYPES.LOCAL
      );
    } else {
      return removeFromStorage(STORAGE_KEYS.REMEMBER_ME, STORAGE_TYPES.LOCAL);
    }
  },

  clearAuthData: () => {
    const localCleared = [
      removeFromStorage(STORAGE_KEYS.AUTH_TOKEN, STORAGE_TYPES.LOCAL),
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN, STORAGE_TYPES.LOCAL),
      removeFromStorage(STORAGE_KEYS.USER_DATA, STORAGE_TYPES.LOCAL),
      removeFromStorage(STORAGE_KEYS.REMEMBER_ME, STORAGE_TYPES.LOCAL),
    ];

    const sessionCleared = [
      removeFromStorage(STORAGE_KEYS.AUTH_TOKEN, STORAGE_TYPES.SESSION),
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN, STORAGE_TYPES.SESSION),
      removeFromStorage(STORAGE_KEYS.USER_DATA, STORAGE_TYPES.SESSION),
    ];

    return localCleared.some(Boolean) || sessionCleared.some(Boolean);
  },
};
