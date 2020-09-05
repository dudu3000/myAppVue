<template>
    <div class="title">
          <!--Display the title for each post in this "for"-->
          <h3>{{ postTitle }}</h3>
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