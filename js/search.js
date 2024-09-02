// Control the search box's show and hide

const searchList = document.querySelector('.search-list')

// When user started to input in search box 
document.querySelector('.search-city').addEventListener('input', e => {

  // if length changes
  if (e.target.value.length > 0) {
    searchList.classList.add('show')
  } else {
    searchList.classList.remove('show')
  }
})

// If the input box focus blurred
document.querySelector('.search-city').addEventListener('blur', e => {

  // Leave time to retrieve the city code
  setTimeout(() => {
    searchList.classList.remove('show')
  }, 500)
})

// If the input box focused, reshow
document.querySelector('.search-city').addEventListener('focus', e => {
  if (e.target.value.length > 0) {
    searchList.classList.add('show')
  }
})