function getValueById(elementId) {
  return document.getElementById(elementId).value;
}

function getDaysInYear(date) {
  const year = new Date(date).getFullYear();
  const result = ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365;

  document.getElementById('days-in-year-output').innerHTML = result;
}

function getDayNumber(stringDate) {
  const date = new Date(stringDate);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 0);
  const result = (date - firstDayOfYear) / 1000 / 3600 / 24;

  document.getElementById('day-of-year-output').innerHTML = result.toFixed();
}

function getQuarters(stringDate) {
  const date = new Date(stringDate);
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  const romanQuarter = 'III'.substring(0, quarter % 4) + (quarter === 4 ? 'IV' : '');
  const splitDateString = date.toDateString().split(' ');

  document.getElementById('quarter-output').innerHTML = `${splitDateString[1]} ${splitDateString[2]} is ${romanQuarter} quarter`;
}

function calcDateDiff(stringDateFirst, stringDateSecond) {
  const dateFirst = new Date(stringDateFirst);
  const dateSecond = new Date(stringDateSecond);
  const difference = (dateFirst > dateSecond ? dateFirst - dateSecond : dateSecond - dateFirst) / 1000 / 60;

  const result = difference < 60
    ? `${difference} minutes`
    : difference < 1440
      ? `${Math.floor(difference / 60)} hours ${difference % 60} minutes`
      : difference < 43200
        ? `${Math.floor(difference / 60 / 24)} days`
        : difference < 525600
          ? `${Math.floor(difference / 60 / 24 / 30)} month`
          : `${Math.floor(difference / 60 / 24 / 365)} years`;

  document.getElementById('datediff-output').innerHTML = result;

  return result;
}

function createMap(jsonString) {
  const newJson = jsonString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  const array = JSON.parse(newJson);

  const map = new Map();
  array.forEach(item => map.set(item.id, item));

  console.log(map);
}

const dateDiffCache = new Map();

function cacheCalcDateDiff(stringDateFirst, stringDateSecond) {
  const key = `${stringDateFirst}, ${stringDateSecond}`;

  if (!dateDiffCache.has(key))
    dateDiffCache.set(key, calcDateDiff(stringDateFirst, stringDateSecond));

  return dateDiffCache.get(key);
}

function getCacheCalcDateDiff() {
  console.log(dateDiffCache)
}