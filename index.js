const bouillonSection = document.querySelector('.bouillon');
const bouillonList = document.querySelector('.bouillon-list');

const createBoulionEl = (el) => {
  const bouillonPic = document.createElement('img');
  bouillonPic.setAttribute('src', `./assets/content/${el.dataset.bouillon}.png`);
  bouillonPic.className = 'bouillon-pic';
  bouillonSection.append(bouillonPic);
};

bouillonList.addEventListener('click', (e) => {
  console.log(e.target.parentNode);
  createBoulionEl(e.target.parentNode);
  bouillonList.classList.add('non-displayed');
});
