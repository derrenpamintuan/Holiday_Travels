const $form = document.querySelector('form');
const $noResults = document.querySelector('.not-found');
const $results = document.querySelector('.results');
const $input = document.querySelector('#search');
const $tbody = document.querySelector('tbody');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  $tbody.innerHTML = '';
  const countryCode = $input.value;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://date.nager.at/api/v3/publicholidays/2023/' + countryCode);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const data = xhr.response;

    if (data === null || data.status === 404) {
      $results.style.display = 'none';
      $noResults.style.display = 'block';
    } else {
      $noResults.style.display = 'none';
    }

    for (let i = 0; i < data.length; i++) {
      const holiday = renderRow(data[i]);
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

  const $tr = document.createElement('tr');
  $tr.append($date, $localName, $name);

  return $tr;
}
