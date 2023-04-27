const $form = document.querySelector('form');
const $noResults = document.querySelector('.not-found');
const $results = document.querySelector('.results');
const $input = document.querySelector('#search');
const $tbody = document.querySelector('tbody');
const $table = document.querySelector('table');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  $tbody.innerHTML = '';
  const countryCode = $input.value;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://date.nager.at/api/v3/publicholidays/2023/' + countryCode);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const apiData = xhr.response;

    if (apiData === null || apiData.status === 404) {
      $results.style.display = 'none';
      $noResults.style.display = 'block';
    } else {
      $noResults.style.display = 'none';
    }

    for (let i = 0; i < apiData.length; i++) {
      const holiday = renderRow(apiData[i]);
      $tbody.appendChild(holiday);
      $results.style.display = 'block';
    }
  });
  xhr.send();
});

function renderRow(holiday) {
  const $date = document.createElement('td');
  $date.setAttribute('class', 'date');

  const $dateText = document.createTextNode(holiday.date);
  $date.appendChild($dateText);

  const $localName = document.createElement('td');
  $localName.setAttribute('class', 'local-name');

  const $localNameText = document.createTextNode(holiday.localName);
  $localName.appendChild($localNameText);

  const $name = document.createElement('td');
  $name.setAttribute('class', 'name');

  const $nameText = document.createTextNode(holiday.name);
  $name.appendChild($nameText);

  const $code = document.createElement('td');
  $code.setAttribute('class', 'code');

  const $codeText = document.createTextNode(holiday.countryCode);
  $code.appendChild($codeText);

  const $iconElement = document.createElement('i');
  $iconElement.setAttribute('class', 'fa-regular fa-heart');

  const $tr = document.createElement('tr');
  $tr.append($code, $date, $localName, $name, $iconElement);

  return $tr;
}

$table.addEventListener('click', function (event) {
  if (event.target.className === 'fa-regular fa-heart') {
    const $codeValue = event.target.closest('tr').childNodes[0].textContent;
    const $dateValue = event.target.closest('tr').childNodes[1].textContent;
    const $localNameValue = event.target.closest('tr').childNodes[2].textContent;
    const $nameValue = event.target.closest('tr').childNodes[3].textContent;

    const holiday = {};
    holiday.contryCode = $codeValue;
    holiday.date = $dateValue;
    holiday.localName = $localNameValue;
    holiday.name = $nameValue;
    holiday.id = data.holidayId;
    data.holidays.push(holiday);
    data.holidayId++;

    event.target.setAttribute('class', 'fa-solid fa-heart');
  }
});
