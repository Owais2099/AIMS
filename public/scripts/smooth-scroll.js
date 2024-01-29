document.querySelectorAll('.home-menu a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href').substring(1)
    const targetElement =
      targetId === 'bottom'
        ? document.documentElement
        : document.getElementById(targetId)

    if (targetElement) {
      if (targetId === 'bottom') {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      } else {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  })
})
