var averages = [averageAgeDifference(ANCESTRY_FILE), averageAge(ANCESTRY_FILE, 'm'), averageAge(ANCESTRY_FILE, 'f')];

var headlineForStatistics = ['Average age difference between mothers and their children', 'Average age of men', 'Average age of women'];


createCards(ANCESTRY_FILE);
createHeadlineAndStatistic(averages, headlineForStatistics, 'Ancestry of one dude');



function averageAgeDifference(arr) {
  var average = 0;
  var count = 0;
  outer: 
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[i]['mother'] === arr[j]['name']) {
        average = average + (arr[i]['born'] - arr[j]['born']);
        ++count;
        continue outer;
      } else {
        continue;
      }
    }
  }
  average = (Math.round((average / count) * 100) / 100);
  return average;
}

function averageAge(arr, sex) {
  var average = 0;
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]['sex'] === sex) {
      average += arr[i]['died'] - arr[i]['born'];
      ++count; 
    } else {
      continue;
    }
  }
  average = (Math.round((average / count) * 100) / 100);
  return average;
}

function createCards(arr) {
  var firstScript = document.querySelector('script');
  var container = document.createElement('div');
  container.className = 'container';
  for (var i = 0; i < arr.length; i++) {
    var div = document.createElement('div');
    div.className = 'container__card';
    for (key in arr[i]) {
      if (key === 'name') {
        var h3Name = document.createElement('h3');
        h3Name.className = 'container__name';
        h3Name.textContent = arr[i]['name'];
        div.insertAdjacentElement('afterbegin', h3Name);
      } else if (arr[i][key]) {
        var paragraph = document.createElement('p');
        var span = document.createElement('span');
        paragraph.className = 'container__paragraph';
        span.className = 'container__data';
        span.textContent = arr[i][key];
        paragraph.textContent = key + ': ';
        paragraph.appendChild(span);
        div.insertAdjacentElement('beforeend', paragraph);
      } else {
        var paragraph = document.createElement('p');
        var span = document.createElement('span');
        paragraph.className = 'container__paragraph';
        span.className = 'container__data';
        span.textContent = 'unknown';
        paragraph.textContent = key + ': ';
        paragraph.appendChild(span);
        div.insertAdjacentElement('beforeend', paragraph);
      }
    }
    container.insertAdjacentElement('beforeend', div);
  }
  document.body.insertBefore(container, firstScript);
}

function createHeadlineAndStatistic(firstArr, secondArr, headline) {
  var h1 = document.createElement('h1');
  var statContainer = document.createElement('div');
  h1.className = 'headline';
  statContainer.className = 'stat-container';
  h1.textContent = headline;
  for (var i = 0; i < firstArr.length; i++) {
    var div = document.createElement('div');
    var h3 = document.createElement('h3');
    var p = document.createElement('p');
    div.className = 'stat-container__inner-cont';
    h3.className = 'stat-container__stat-headline';
    p.className = 'stat-container__result';
    h3.textContent = secondArr[i];
    p.textContent = firstArr[i];
    div.appendChild(h3);
    div.appendChild(p);
    statContainer.appendChild(div);
  }
  document.body.insertBefore(statContainer, document.body.firstChild);
  document.body.insertBefore(h1, statContainer);
}

