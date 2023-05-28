const bouillonSection = document.querySelector('.bouillon');
const menuSection = document.querySelector('.menu');
const ingredientsSection = document.querySelector('.ingredients');
const processSection = document.querySelector('.process');
const bouillonList = document.querySelector('.bouillon-list');

const menuBtns = document.createElement('div');
menuBtns.className = 'menu-btns';

const bouillon = ['мясо', 'рыба', 'курица'];
const ingredients = {
  main: ['картошка', 'лук', 'морковка'],
  optional: ['чеснок', 'зелень'],
  paprika: ['перец болгарский'],
};
const menu = {
  meat: [
    { Щи: [ingredients['main'], 'капуста', 'томатная паста или помидор'] },
    { Борщ: [ingredients['main'], 'капуста', 'свекла', 'томатная паста или помидор'] },
    { Чечевичный: [ingredients['main'], 'чечевица', 'томатная паста или помидор'] },
    { Грибной: [ingredients['main'], 'грибы', 'рис'] },
    { 'С клецками': [ingredients['main'], 'яйцо', 'молоко', 'мука'] },
    { 'Самое простое/быстрое/ващенекогда': [ingredients['main'], 'ничего'] },
  ],
  fish: [{ 'С консервой': [ingredients['main'], 'рис'] }],
  chiken: [
    { 'С вермишелью': [ingredients['main'], 'вермишель'] },
    { 'С горошком': [ingredients['main'], 'горошек замороженный', 'помидор'] },
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

  createIngredientsBlock(ingredients['main'], 'Обязательно:', document.querySelector('.bouillon-pic').dataset.boullion);
  switch (true) {
    case data == 'Борщ':
      createAddIngredientsBlock(data, menu.meat);
      createIngredientsBlock(ingredients['paprika'], 'Можно добавить:');
      break;
    case data == 'Щи':
      createAddIngredientsBlock(menu.meat);
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

  if (boullion) {
    switch (document.querySelector('.bouillon-pic').dataset.boullion) {
      case 'meat':
        ingredientsContainer.append('мясо');
        break;
      case 'fish':
        ingredientsContainer.append('тунец');
        break;
      case 'chiken':
        ingredientsContainer.append('курица');
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
  console.log('ok');
};
