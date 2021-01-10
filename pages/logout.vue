<template>
  <div>Clearing data...</div>
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
