(function () {
  'use strict'

  const container = document.getElementById('history-container')
  const wrapper = document.getElementById('history_container_wrapper')

  if (!container || !wrapper) return

  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const key = 'S' + month + day

  const showMessage = text => {
    wrapper.innerHTML = '<div class="history_slide" style="height:20px;color:var(--text-highlight-color)">' + text + '</div>'
  }

  fetch('/data/history-calendar/' + month + '.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status)
      return response.json()
    })
    .then(data => {
      const events = data && Array.isArray(data[key]) ? data[key] : []
      if (events.length === 0) {
        showMessage('今天没有找到历史记录')
        return
      }

      const html = events.map(item => {
        return '<div class="swiper-slide history_slide">' +
          '<span class="history_slide_time">A.D.' + (item.year || '') + '</span>' +
          '<span class="history_slide_link">' + (item.title || '') + '</span>' +
          '</div>'
      }).join('')

      wrapper.innerHTML = html

      if (typeof Swiper === 'undefined') {
        showMessage('轮播组件未加载')
        return
      }

      const swiperHistory = new Swiper('.history_swiper-container', {
        passiveListeners: true,
        spaceBetween: 12,
        effect: 'slide',
        loop: events.length > 1,
        direction: 'vertical',
        slidesPerView: 1,
        autoplay: {
          disableOnInteraction: true,
          delay: 5000
        },
        mousewheel: false
      })

      container.onmouseenter = () => swiperHistory.autoplay.stop()
      container.onmouseleave = () => swiperHistory.autoplay.start()
    })
    .catch(error => {
      console.error('历史上的今天加载失败:', error)
      showMessage('历史上的今天暂时无法加载')
    })
})()
