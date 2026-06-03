export const saveTokens = (data) => {

  localStorage.setItem(
    "access",
    data.access
  );

  localStorage.setItem(
    "refresh",
    data.refresh
  );

  localStorage.setItem(
    "role",
    data.role
  );
};

export const logout = () => {

  localStorage.clear();
};