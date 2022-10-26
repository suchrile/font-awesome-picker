const loader = document.querySelector('.lds-dual-ring')
const search = document.querySelector('.search input')
const filters = document.querySelector('.filters')
const iconsLayout = document.querySelector('.icons-layout')
let iconsList

async function getIcons(filter) {
  loader.style.display = 'flex'
  const icons = await fetch(`icons/${filter}.json`)
    .then(results => results.json())
  iconsList = Object.keys(icons).map(name => {
    return { name, html: icons[name] }
  })
  renderIcons(iconsList)
}

getIcons('brands')

filters.addEventListener('click', changeFilter)
search.addEventListener('input', serachIcons)

function changeFilter(event) {
  const target = event.target
  if (target.classList.contains('active')) return
  filters.querySelectorAll('div').forEach(elem => elem.classList.remove('active'))
  target.classList.add('active')
  getIcons(target.dataset.filter)
}

function serachIcons(event) {
  loader.style.display = 'flex'
  const value = event.target.value.trim().toLowerCase()
  const response = iconsList.filter(el => el.name.indexOf(value) > -1)
  renderIcons(response)
}

function renderIcons(list) {
  iconsLayout.removeEventListener('click', copy)
  iconsLayout.innerHTML = ''

  list.forEach(icon => {
    iconsLayout.insertAdjacentHTML(
      'beforeend',
      `
        <div class="icon">
        <div class="icon-image">${icon.html}</div>
        <div class="icon-name">${icon.name}</div>
        </div>
      `
    )
  })

  iconsLayout.addEventListener('click', copy)
  loader.style.display = 'none'
}

function copy(e) {
  if (e.target.classList.contains('icon-image')) {
    navigator.clipboard.writeText(e.target.innerHTML)
  } else if (e.target.classList.contains('icon-name')) {
    navigator.clipboard.writeText(e.target.innerText)
  }
}