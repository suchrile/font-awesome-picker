const loader = document.querySelector('.lds-dual-ring')
const search = document.querySelector('.search input')
const filters = document.querySelector('.filters')
const iconsLayout = document.querySelector('.icons-layout')
let iconsList = []
let searchValue = ''

async function getIcons(filter) {
  loader.style.display = 'flex'
  const icons = await fetch(`icons/${filter}.json`)
    .then(results => results.json())
  iconsList = Object.keys(icons).map(name => {
    return { name, html: icons[name] }
  })
  renderIcons()
}

getIcons('brands')

filters.addEventListener('click', changeFilter)
search.addEventListener('input', inputHandler)

function changeFilter(event) {
  const target = event.target
  if (target.classList.contains('active')) return
  filters.querySelectorAll('div').forEach(elem => elem.classList.remove('active'))
  target.classList.add('active')
  getIcons(target.dataset.filter)
}

function inputHandler(event) {
  const value = event.target.value.trim()
  if (searchValue === value) return
  searchValue = value
  renderIcons()
}

function serachIcons() {
  return iconsList.filter(el => el.name.indexOf(searchValue) > -1)
}

function renderIcons() {
  loader.style.display = 'flex'
  iconsLayout.removeEventListener('click', copy)
  iconsLayout.innerHTML = ''

  const list = serachIcons()

  if (list.length) {
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
  } else {
    iconsLayout.insertAdjacentHTML(
      'beforeend',
      `<div class="layout-message">
        <svg style="height: 120px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M329.6 291.3C332.8 286.9 339.2 286.9 342.4 291.3C343.7 293 345.2 294.1 346.8 297C360.9 315.5 384 345.6 384 369C384 395 362.5 416 336 416C309.5 416 288 395 288 369C288 345.4 311.5 314.8 325.7 296.4C327.1 294.5 328.4 292.8 329.6 291.3zM304 369C304 385.8 318 400 336 400C353.1 400 368 385.8 368 369C368 360.9 363.1 349.2 354.5 335.4C348.6 325.9 341.9 316.9 335.1 309.3C330.1 316.9 323.4 325.9 317.4 335.4C308.8 349.1 304 360.9 304 369H304zM192.4 208C192.4 216.8 185.2 224 176.4 224C167.5 224 160.4 216.8 160.4 208C160.4 199.2 167.5 192 176.4 192C185.2 192 192.4 199.2 192.4 208zM320.4 208C320.4 199.2 327.5 192 336.4 192C345.2 192 352.4 199.2 352.4 208C352.4 216.8 345.2 224 336.4 224C327.5 224 320.4 216.8 320.4 208zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 16C123.5 16 16 123.5 16 256C16 388.5 123.5 496 256 496C388.5 496 496 388.5 496 256C496 123.5 388.5 16 256 16zM139.4 321.4C143 318.9 148 319.8 150.6 323.4C171.4 353.2 206.6 384 255.1 384C260.4 384 264 387.6 264 392C264 396.4 260.4 400 255.1 400C199.3 400 159.9 364.6 137.4 332.6C134.9 328.1 135.8 323.1 139.4 321.4H139.4z"></path></svg>
        <p>Nothing was found...</p>
      </div>`
    )
  }

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