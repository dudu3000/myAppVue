<template>
    <div class="title">
          <!--Display the title for each post in this "for"-->
          <h2>{{ postTitle }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'postName',
        data(){
            return {
            }
        },
        props: 
          [
            'postTitle'
          ]
    }
</script>

<style lang="scss" scoped>

</style>