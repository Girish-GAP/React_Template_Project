export const saveToStorage = (
  key: string,
  value: string,
  session?: boolean
) => {
  if (session) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

export const fetchFromStorage = (key: string, session?: boolean) => {
  if (session) {
    return sessionStorage.getItem(key);
  } else {
    return localStorage.getItem(key);
  }
};

export const removeFromStorage = (key: string, session?: boolean) => {
  if (session) {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
};

export const clearStorage = (level: "session" | "local" | "all" = "local") => {
  switch (level) {
    case "session":
      sessionStorage.clear();
      break;
    case "local":
      localStorage.clear();
      break;
    case "all":
      sessionStorage.clear();
      localStorage.clear();
      break;
  }
};
