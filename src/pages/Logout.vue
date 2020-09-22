<template>
  <div id="app">
    <main>
        {{ $store.dispatch('deleteToken') }}
        {{ $store.dispatch('updateErrorCode', 0) }}
        {{ $store.dispatch('updateeditState', false) }}
        {{ this.$store.dispatch('goToPage', 'login') }}
    </main>
  </div>
</template>




<script>
export default {
    name: "logout"
};
</script>




<style>
</style>