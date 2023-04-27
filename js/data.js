/* exported data */
const data = {
  holidayId: 1,
  holidays: []
};

window.addEventListener('beforeunload', function (event) {
  const holidaysJSON = JSON.stringify(data.holidays);
  if (data.holidays.length !== 0) {
    localStorage.setItem('local-storage', holidaysJSON);
  }
});

const previousHolidays = localStorage.getItem('local-storage');

if (previousHolidays !== null) {
  data.holidays = JSON.parse(previousHolidays);
}
