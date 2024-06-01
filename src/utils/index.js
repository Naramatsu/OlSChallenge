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

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date) => {
  const dateSplitted = date.split("/");
  const day = dateSplitted[0];
  const month = dateSplitted[1];
  const year = dateSplitted[2];

  const dateFormatted = new Date(`${month}/${day}/${year}`);

  const newDate = dateFormatted.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return newDate;
};

export const getRandomColor = () => {
  const colorList = ["#4b49af", "#fdc104", "#fe4649", "#2888fc"];
  const randomIndex = Math.floor(Math.random() * (colorList.length - 1));
  return colorList[randomIndex];
};
