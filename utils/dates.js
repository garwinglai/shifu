const getDateToday = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Get day with leading zero
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Get month with leading zero (0-based index, so +1)
  const year = today.getFullYear(); // Get full year
  const formattedDate = `${month}/${day}/${year}`; // Format as mm/dd/yyyy

  return formattedDate;
};

const getEpochTime = (date) => {
  // Date formatted to mm/dd/yyyy
  // Create a Date object with the formatted date
  const dateObject = new Date(`${date} 00:00:01`); // Sets time to 12:00:01 AM

  // Get the epoch time (milliseconds since January 1, 1970)
  const epochTime = dateObject.getTime();

  return epochTime;
};

export default getDateToday;
export { getEpochTime };
