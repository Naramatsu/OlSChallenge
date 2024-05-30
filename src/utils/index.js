export const saveInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const isDayOrNight = () => {
  const date = new Date().getHours();
  if (date >= 6 && date <= 18) return "day";
  return "night";
};

export const getCelsiusDeg = (deg) => deg - 273.15;
