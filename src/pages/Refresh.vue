<template>
    <div>
        {{$store.dispatch('goToPage', $store.state.refreshPage)}}
    </div>
</template>

<script>
    export default {
        name: 'Refresh'
    }
</script>

<style lang="scss" scoped>

</style>