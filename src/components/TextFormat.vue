<template>
  <span :class="clas">{{ message }}</span>
</template>

<script>
export default {
  props: {
    float: {
      type: Number,
      default: 0
    },
    isBlock: {
      type: Boolean,
      default: false
    },
    isFormat: {
      type: Boolean,
      default: false
    },
    text: {
      default: null
    },
    format: {
      type: Function,
      default: text => {
        text = +text
        return (text > 0 ? '+' : '') + text.toFixed(2) + '%'
      }
    }
  },
  data() {
    return {
      active: 0
    }
  },
  computed: {
    message() {
      if (this.text === null) return '-'
      let text = this.text
      if (this.isFormat && this.format) {
        text = this.format(text)
      }
      return text
    },
    clas() {
      if (this.isBlock) {
        var clas =
          this.float > 0
            ? 'has-background-primary'
            : this.float < 0
            ? 'has-background-danger'
            : 'has-background-grey'
        clas += ' is-block'
        return clas
      }
      return this.float > 0
        ? 'has-text-primary'
        : this.float < 0
        ? 'has-text-danger'
        : 'has-text-grey'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.is-block {
  color: white;
  width: 3.5rem;
  text-align: center;
  line-height: 1.6rem;
  border-radius: 2px;
}
</style>
