<script>
const elTransition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out'
const Transition = {
  'before-enter' (el) {
    el.style.transition = elTransition
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },

  'enter' (el, done) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
    el.style.overflow = 'hidden'
    //监听 transitionend 事件
    var transitionend = window.ontransitionend ? 'transitionend' : 'webkitTransitionEnd'
    el.addEventListener(transitionend, function onEnd() {
      el.removeEventListener(transitionend, onEnd)
      done()
    })
  },

  'after-enter' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  'before-leave' (el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },

  'leave' (el, done) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
    //监听 transitionend 事件
    var transitionend = window.ontransitionend ? 'transitionend' : 'webkitTransitionEnd'
    el.addEventListener(transitionend, function onEnd() {
      el.removeEventListener(transitionend, onEnd)
      done()
    })
  },

  'after-leave' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}

export default {
  name: 'collapseTransition',
  functional: true,
  render (h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}
</script>
