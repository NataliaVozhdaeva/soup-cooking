const bouillonSection = document.querySelector('.bouillon');
const menuSection = document.querySelector('.menu');
const menuBtns = document.querySelector('.menu-btns');
const ingredientsSection = document.querySelector('.ingredients');
const processSection = document.querySelector('.process');

const bouillonList = document.querySelector('.bouillon-list');

const menu = {
  meat: ['Щи', 'Борщ', 'Чечевичный', 'Грибной', 'С клецками', 'Самое простое/быстрое/ващенекогда'],
  fish: ['С консервой'],
  chiken: ['С вермишелью', 'С горошком'],
};
const bouillon = ['мясо', 'рыба', 'курица'];
const frying = ['лук', 'морковка'];
const fryingOptional = ['чеснок', 'свекла', 'помидор', 'перец болгарский'];
const mainIngredients = [
  'картошка',
  'капуста',
  'горошек замороженный',
  'рис',
  'вермишель',
  'чечевица',
  'грибы',
  'клецки',
];

const addArrow = () => {
  const arrowSpan = document.createElement('div');
  arrowSpan.className = 'arrow';
  bouillonSection.append(arrowSpan);
};

const createBoulionEl = (data) => {
  const bouillonPic = document.createElement('img');
  bouillonPic.setAttribute('src', `./assets/content/${data}.png`);
  bouillonPic.className = 'bouillon-pic';
  bouillonSection.append(bouillonPic);
};

const createMenuBtn = (item) => {
  const menuItem = document.createElement('button');
  menuItem.className = 'btn, menu-btn';
  menuItem.setAttribute('data-item', item);
  menuItem.textContent = item;

  menuBtns.append(menuItem);
};

const createMenuSection = (data) => {
  const menuTitle = document.createElement('h3');
  menuTitle.textContent = 'Какой суп?';
  menuSection.prepend(menuTitle);
  for (let i = 0; i < menu[data].length; i++)
    setTimeout(() => {
      createMenuBtn(menu[data][i]);
    }, i * 300);
};

bouillonList.addEventListener('click', (e) => {
  const data = e.target.parentNode.dataset.bouillon;
  createBoulionEl(data);
  bouillonList.classList.add('non-displayed');
  document.querySelector('.bouillon-title').classList.add('non-displayed');
  createMenuSection(data);
});

menuBtns.addEventListener('click', (e) => {
  console.log(e.target.dataset.item);
  addArrow();
  const item = document.createElement('button');
  item.className = 'btn, header-btn';
  item.textContent = e.target.dataset.item;
  bouillonSection.append(item);
  menuSection.classList.add('non-displayed');
});
