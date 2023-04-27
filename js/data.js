/* exported data */
let data = {
  holidayId: 1,
  holidays: []
};

window.addEventListener('beforeunload', function (event) {
  const holidaysJSON = JSON.stringify(data);
  if (data.holidays.length !== 0) {
    localStorage.setItem('local-storage', holidaysJSON);
  }
});

const savedHolidays = localStorage.getItem('local-storage');

if (savedHolidays !== null) {
  data = JSON.parse(savedHolidays);
}
