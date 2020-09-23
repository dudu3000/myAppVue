<template>
    <div>
        {{$store.dispatch('goToPage', 'home')}}
    </div>
</template>

<script>
    export default {
        name: 'Refresh'
    }
</script>

<style lang="scss" scoped>

</style>