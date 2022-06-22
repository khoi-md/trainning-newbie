import Vue from 'vue'

export const OnlyNumber = {
  bind(el) {
    el.addEventListener('keypress', $event => {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57 || keyCode === 46) {
        // 46 is dot
        $event.preventDefault()
      }
    })
  },
}

Vue.directive('only-numbers', OnlyNumber)
