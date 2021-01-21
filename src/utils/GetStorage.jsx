import * as GetUtils from 'utils/GetUtils';

// Session
export function SetSessionStore(key, value) {
  return sessionStorage.setItem(key, JSON.stringify(value));
}
export function GetSessionStore(key) {
  return JSON.parse(sessionStorage.getItem(key));
}
export function RemoveSessionStore(key) {
  return sessionStorage.removeItem(key);
}
export function ClearSessionStore() {
  return sessionStorage.clear();
}

// Local
export function SetLocalStore(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function GetLocalStore(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function RemoveLocalStore(key) {
  return localStorage.removeItem(key);
}
export function ClearLocalStore() {
  return localStorage.clear();
}

// Use Basic
export function UseSessionStore(storeKey, response, responseFunc) {
  if (storeKey in sessionStorage) {
    if (JSON.stringify(response) !== sessionStorage.getItem(storeKey)) {
      sessionStorage.clear();
    }
  } else {
    sessionStorage.setItem(storeKey, JSON.stringify(response));
  }
  responseFunc(response);
}
export function UseLocalStore(storeKey, response, responseFunc) {
  if (storeKey in localStorage) {
    if (JSON.stringify(response) !== localStorage.getItem(storeKey)) {
      localStorage.clear();
    }
  } else {
    localStorage.setItem(storeKey, JSON.stringify(response));
  }
  responseFunc(response);
}

// Use Double
export function UseSessionStoreDouble(storeKey1, storeKey2, response1, response2, responseFunc) {
  if (storeKey1 in sessionStorage) {
    if (JSON.stringify(response1) !== sessionStorage.getItem(storeKey1)) {
      sessionStorage.clear();
    }
  } else {
    sessionStorage.setItem(storeKey1, JSON.stringify(response1));
    sessionStorage.setItem(storeKey2, JSON.stringify(response2));
  }
  responseFunc(response1, response2);
}
export function CallSessionStoreDouble(storeKey1, storeKey2, responseFunc, asyncFunc) {
  if (storeKey1 in sessionStorage) {
    if (!JSON.parse(sessionStorage.getItem(storeKey1)).length || !JSON.parse(sessionStorage.getItem(storeKey2))) {
      sessionStorage.clear();
    } else {
      responseFunc(JSON.parse(sessionStorage.getItem(storeKey1)), JSON.parse(sessionStorage.getItem(storeKey2)));
    }
  }
  asyncFunc();
}

// Call
export function CallSessionStore(storeKey, responseFunc, asyncFunc, type = 'array') {
  if (storeKey in sessionStorage) {
    if (type === 'array') {
      if (!JSON.parse(sessionStorage.getItem(storeKey)).length) {
        sessionStorage.clear();
      } else {
        responseFunc(JSON.parse(sessionStorage.getItem(storeKey)));
      }
    } else if (type === 'object') {
      if (Object.keys(JSON.parse(sessionStorage.getItem(storeKey))).length === 0) {
        sessionStorage.clear();
      } else {
        responseFunc(JSON.parse(sessionStorage.getItem(storeKey)));
      }
    }
  }
  asyncFunc();
}
export function CallLocalStore(storeKey, responseFunc, asyncFunc, type = 'array') {
  if (storeKey in localStorage) {
    if (type === 'array') {
      if (!JSON.parse(localStorage.getItem(storeKey)).length) {
        localStorage.clear();
      } else {
        responseFunc(JSON.parse(localStorage.getItem(storeKey)));
      }
    } else if (type === 'object') {
      if (Object.keys(JSON.parse(localStorage.getItem(storeKey))).length === 0) {
        localStorage.clear();
      } else {
        responseFunc(JSON.parse(localStorage.getItem(storeKey)));
      }
    }
  }
  asyncFunc();
}

// Call Post
export function CallSessionStorePost(storeKey, responseFunc, asyncFunc, isPost) {
  if (storeKey in sessionStorage) {
    if (Object.keys(JSON.parse(sessionStorage.getItem(storeKey))).length === 0) {
      sessionStorage.clear();
    } else {
      responseFunc(JSON.parse(sessionStorage.getItem(storeKey)));
    }
    asyncFunc();
  } else {
    (isPost) ? asyncFunc() : GetUtils.GetGoto('/notfound');
  }
}
export function CallLocalStorePost(storeKey, responseFunc, asyncFunc, isPost) {
  if (storeKey in localStorage) {
    if (Object.keys(JSON.parse(localStorage.getItem(storeKey))).length === 0) {
      localStorage.clear();
    } else {
      responseFunc(JSON.parse(localStorage.getItem(storeKey)));
    }
    asyncFunc();
  } else {
    (isPost) ? asyncFunc() : GetUtils.GetGoto('/notfound');
  }
}