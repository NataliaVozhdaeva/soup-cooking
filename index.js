const bouillonSection = document.querySelector('.bouillon');
const menuSection = document.querySelector('.menu');
const ingredientsSection = document.querySelector('.ingredients');
const processSection = document.querySelector('.process');
const bouillonList = document.querySelector('.bouillon-list');

const menuBtns = document.createElement('div');
menuBtns.className = 'menu-btns';

let state;

const bouillon = ['мясо', 'рыба', 'курица'];
const ingredients = {
  main: ['картошка (~3шт)', 'лук (1шт)', 'морковка (1шт)'],
  optional: ['чеснок', 'зелень'],
  paprika: ['перец болгарский'],
};
const menu = {
  meat: [
    { Щи: [ingredients['main'], 'капуста', 'томатная паста (1 ст.ложка) или помидор'] },
    { Борщ: [ingredients['main'], 'капуста', 'свекла', 'томатная паста (1 ст.ложка) или помидор'] },
    { Чечевичный: [ingredients['main'], 'чечевица', 'томатная паста (1 ст.ложка) или помидор'] },
    { Грибной: [ingredients['main'], 'грибы (~100гр)', 'рис (~треть маленького стакана)'] },
    { 'С клецками': [ingredients['main'], 'яйцо', 'молоко (2 ст.ложки)', 'мука (6-7ст.ложек)'] },
    { 'Самое простое/быстрое/ващенекогда': [ingredients['main'], 'ничего'] },
  ],
  fish: [{ 'С консервой': [ingredients['main'], 'рис (~треть маленького стакана)'] }],
  chiken: [
    { 'С вермишелью': [ingredients['main'], 'вермишель (~треть маленького стакана)'] },
    { 'С горошком': [ingredients['main'], 'горошек замороженный (~100гр)', 'помидор'] },
  ],
};

const header = document.createElement('header');
header.className = 'header';
document.querySelector('.main').prepend(header);

const addArrow = () => {
  const arrowSpan = document.createElement('div');
  arrowSpan.className = 'arrow';
  header.append(arrowSpan);
};

const createBoulionEl = (data) => {
  menuSection.append(menuBtns);
  const bouillonPic = document.createElement('img');
  bouillonPic.setAttribute('data-boullion', data);
  bouillonPic.setAttribute('src', `./assets/content/${data}.png`);
  bouillonPic.className = 'bouillon-pic';
  header.append(bouillonPic);
  header.style.margin = '50px auto';
};

const createMenuBtn = (item) => {
  const menuItem = document.createElement('button');
  menuItem.className = 'btn menu-btn';
  menuItem.setAttribute('data-item', Object.keys(item)[0]);
  menuItem.textContent = Object.keys(item)[0];
  document.querySelector('.menu-btns').append(menuItem);
};

const createMenuSection = (data) => {
  const menuTitle = document.createElement('h3');
  menuTitle.textContent = 'Какой суп?';
  menuSection.prepend(menuTitle);

  for (let i = 0; i < menu[data].length; i++) {
    setTimeout(() => {
      createMenuBtn(menu[data][i]);
    }, i * 300);
  }
};

bouillonList.addEventListener('click', (e) => {
  const data = e.target.parentNode.dataset.bouillon;
  createBoulionEl(data);
  bouillonList.classList.add('non-displayed');
  document.querySelector('.bouillon-title').classList.add('non-displayed');
  createMenuSection(data);
});

menuBtns.addEventListener('click', (e) => {
  const data = e.target.dataset.item;
  addArrow();
  const item = document.createElement('button');
  item.className = 'btn header-btn';
  item.textContent = data;
  header.append(item);
  menuSection.classList.add('non-displayed');
  createIngredientsSection(data);
});

const createIngredientsSection = (data) => {
  const ingredientTitle = document.createElement('h3');
  ingredientTitle.className = 'ingredients-title';
  ingredientTitle.textContent = 'Понадобится:';
  ingredientsSection.prepend(ingredientTitle);
  state = data;

  createIngredientsBlock(ingredients['main'], 'Обязательно:', document.querySelector('.bouillon-pic').dataset.boullion);
  switch (true) {
    case data == 'Борщ':
      createAddIngredientsBlock(data, menu.meat);
      createIngredientsBlock(ingredients['paprika'], 'Можно добавить:');
      break;
    case data == 'Щи':
      createAddIngredientsBlock(data, menu.meat);
      createIngredientsBlock(ingredients['paprika'], 'Можно добавить:');
      break;
    case data == 'Чечевичный':
      createAddIngredientsBlock(data, menu.meat);
      break;
    case data == 'Грибной':
      createAddIngredientsBlock(data, menu.meat);
      break;
    case data == 'С клецками':
      createAddIngredientsBlock(data, menu.meat);
      createIngredientsBlock(ingredients['paprika'], 'Можно добавить:');
      break;
    case data == 'Самое простое/быстрое/ващенекогда':
      createAddIngredientsBlock(data, menu.meat);
      createIngredientsBlock(ingredients['paprika'], 'Можно добавить:');
      break;
    case data == 'С консервой':
      createAddIngredientsBlock(data, menu.fish);
      break;
    case data == 'С вермишелью':
      createAddIngredientsBlock(data, menu.chiken);
      break;
    case data == 'С горошком':
      createAddIngredientsBlock(data, menu.chiken);
      createIngredientsBlock(ingredients['paprika'], 'Можно добавить:');
      break;
  }
  createIngredientsBlock(ingredients['optional'], 'Опционально:');

  createIngredientsBtn();
};

const createAddIngredientsBlock = (data, mainIngr) => {
  Object.values(mainIngr).forEach((el) => {
    if (Object.keys(el) == data) {
      createIngredientsBlock(Object.values(el)[0].slice(1), 'Дополнительно:');
    }
  });
};

const createIngredientsBlock = (arr, title, boullion = false) => {
  const ingredientsContainer = document.createElement('div');
  ingredientsContainer.className = 'ingredients-container';
  const blockTitle = document.createElement('h4');
  blockTitle.textContent = title;
  ingredientsContainer.append(blockTitle);
  ingredientsSection.append(ingredientsContainer);
  let el;
  if (boullion) {
    switch (document.querySelector('.bouillon-pic').dataset.boullion) {
      case 'meat':
        el = document.createElement('span');
        el.textContent = 'мясо';
        ingredientsContainer.append(el);
        break;
      case 'fish':
        el = document.createElement('span');
        el.textContent = 'тунец';
        ingredientsContainer.append(el);
        break;
      case 'chiken':
        el = document.createElement('span');
        el.textContent = 'курица';
        ingredientsContainer.append(el);
        break;
    }
  }
  for (let item of arr) {
    let el = document.createElement('span');
    el.textContent = item + ' ';
    ingredientsContainer.append(el);
  }
};

const createIngredientsBtn = () => {
  const btnsContainer = document.createElement('div');
  btnsContainer.className = 'btns-container';
  ingredientsSection.append(btnsContainer);

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn menu-btn submit';
  submitBtn.textContent = 'Все есть, готовим!';
  btnsContainer.append(submitBtn);

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn menu-btn cancel';
  cancelBtn.textContent = 'Давай другое';
  btnsContainer.append(cancelBtn);

  btnsContainer.addEventListener('click', (e) => {
    e.target.classList.contains('cancel') ? cancelCooking() : discribeProcess();
  });
};

const cancelCooking = () => {
  header.style.margin = '0';
  Array.from(document.querySelectorAll('.menu-btn')).forEach((el) => el.remove());
  header.innerHTML = '';
  menuSection.innerHTML = '';
  ingredientsSection.innerHTML = '';
  menuSection.classList.remove('non-displayed');
  bouillonList.classList.remove('non-displayed');
  document.querySelector('.bouillon-title').classList.remove('non-displayed');
};

const discribeProcess = () => {
  addArrow();
  const processPic = document.createElement('img');
  processPic.setAttribute('src', `./assets/content/process.png`);
  processPic.className = 'bouillon-pic';
  header.append(processPic);
  ingredientsSection.innerHTML = '';
  const processTitle = document.createElement('h3');
  processTitle.textContent = 'Процесс';
  processSection.prepend(processTitle);
  createProcess();
};

const createProcess = () => {
  const stepsContainer = document.createElement('div');
  stepsContainer.className = 'steps-container';
  processSection.append(stepsContainer);
  const createStep = () => {
    let el = document.createElement('p');
    stepsContainer.append(el);
    return el;
  };
  if (document.querySelector('.bouillon-pic').dataset.boullion == 'fish') {
    createStep().textContent =
      'Картошку помыть, почистить, порезать и поставить вариться с лавровым листиком. Масло из консервы перелить в сковородку, чтобы на нем жарить.';
    createStep().textContent = frying();
    createStep().textContent = erlyAdd('рис');
    createStep().textContent = addFrying;
    createStep().textContent = addTune;
    createStep().textContent = green;
  } else {
    createStep().textContent = 'Ставим мясо вариться с лавровым листиком.';
    createStep().textContent = 'Картошку помыть, почистить, порезать и добавить к мясу.';
    createStep().textContent = frying();
    createStep().textContent = removeMeat;
    if (state == 'Борщ' || state == 'Щи' || state == 'Грибной' || state == 'С клецками') {
      switch (true) {
        case state == 'Борщ':
          createStep().textContent = erlyAdd('капусту');
          createStep().textContent = moreFrying('свеклу, потом перец, если есть, и томатную пасту');
          break;
        case state == 'Щи':
          createStep().textContent = erlyAdd('капусту');
          createStep().textContent = moreFrying('перец, если есть, и томатную пасту');
          break;
        case state == 'Грибной':
          createStep().textContent = erlyAdd('рис');
          createStep().textContent = moreFrying('грибы');
          break;
        case state == 'С клецками':
          createStep().textContent = moreFrying('перец');
      }
    }

    createStep().textContent = addFrying;
    if (state == 'Чечевичный' || state == 'С клецками' || state == 'С вермишелью' || state == 'С горошком') {
      switch (true) {
        case state == 'Чечевичный':
          createStep().textContent = lastAdd('чечевицу и томатную пасту');
          break;
        case state == 'С клецками':
          createStep().textContent = lastAdd(
            'клецки. Для этого смешиваем две столовых ложки молока, яйцо и 6-7 ложек муки. Тесто не должно "течь", оно должно рваться. Зачерпываем полчайной ложечки теста, другой ложечкой снимаем его в кастрюлю'
          );
          break;
        case state == 'С вермишелью':
          createStep().textContent = lastAdd('вермишель');
          break;
        case state == 'С горошком':
          createStep().textContent = lastAdd('горошек и помидор');
          break;
      }
    }
    createStep().textContent =
      'Если места в кастрюле много, а бульона мало - самое время подлить воды. Поварить еще минут 5 все вместе.';
    createStep().textContent = meatBack;
  }
  createStep().textContent = green;
};

const frying = () =>
  'Чистим и режем все овощи из списка ингридиентов. Обжариваем лук и чеснок, когда они станут мягкими, добавляем морковку и тоже обжариваем.';
const moreFrying = (ing) => `Добавляем к зажарке ${ing} и обжариваем еще пять минут уже все вместе.`;
const removeMeat = 'Достаем мясо остывать.';
const erlyAdd = (ing) => `В это время закипает картошка, добавляем в нее ${ing}.`;
const addFrying = 'Когда все снова закипело, отправляем зажарку в кастрюлю. Варим 10 минут.';
const lastAdd = (ing) => `Добавляем ${ing}.`;
const meatBack = 'Возвращаем порезанное мясо.';
const green = 'Добавляем специи. Если есть зелень, тоже добавляем сейчас и выключаем суп. Варить зеленку не надо.';
const addTune = 'Добавляем тунца из банки и варим все вместе еще минут 5.';
