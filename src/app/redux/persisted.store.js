const StoreKey = 'USER_AUTHENTICATION_DATA';

export const saveState = (state) => {
  try {
    // Parsing auth data from Redux store
    let stateFilter = JSON.parse(JSON.stringify(state))

    // Saving auth Data to localStorage
    let rawState = JSON.stringify({
      auth: stateFilter.auth,
      settings: stateFilter.settings || {}
    });

    localStorage.setItem(StoreKey, rawState)
  } catch (err) {
    // Ignore write error
  }
}

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const rawState = localStorage.getItem(StoreKey);
    if (rawState === null) return undefined;
    const state = JSON.parse(rawState);
    return state;
  } catch (err) {
    return undefined;
  }
})();