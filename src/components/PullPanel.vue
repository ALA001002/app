<template>
  <div ref="panel" class="background">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.background {
  background-image: linear-gradient(white 30%, whitesmoke 40%, whitesmoke)
}
</style>
