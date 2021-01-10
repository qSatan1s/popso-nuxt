<template>
  <div class="container">
    <div class="pageContent">
      <div>Clearing data...</div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/login')
  },
}
</script>
