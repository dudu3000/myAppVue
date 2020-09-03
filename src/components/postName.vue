<template>
    <div v-if="file !== ''">
        <div class="title">
          <!--Display the title for each post in this "for"-->
          <h3>{{ posts[file.index].title }}</h3>
        </div>
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
            'posts',
            'file'
          ]
    }
</script>

<style lang="scss" scoped>

</style>