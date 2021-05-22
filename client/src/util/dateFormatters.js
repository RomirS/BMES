const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const formatMonthName = (monthIndex) => monthNames[monthIndex];

const formatMonthNumber = (monthIndex) => {
  const monthNo = monthIndex + 1;
  return monthNo < 10 ? `0${monthNo}` : `${monthNo}`;
}

const formatAMPM = (isoDate) => {
  const date = new Date(isoDate);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours < 12 ? 'am' : 'pm';
  hours %= 12;
  hours = hours || 12;
  const mins = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${mins}${ampm}`;
  return strTime;
}

export { monthNames, formatMonthName, formatMonthNumber, formatAMPM };