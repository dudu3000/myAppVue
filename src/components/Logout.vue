<template>
  <div id="app">
    <main>
      {{ $store.dispatch('deleteToken') }}
      {{ this.$store.dispatch('goToPage', 'login') }}
    </main>
  </div>

</template>




<script>
export default{
  name: 'logout'
}
</script>




<style>
</style>