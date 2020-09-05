<template>
    <div v-if="files" class="flex">
      <!--"For" used to display 6 posts. Files variable stores the files from HTTP response.-->
      <div v-for="file in files" :key="file.name" style="width: 30%; height: auto;">
        <dialogComponent
          :postDialog="dialog[file.index]"
          :imageData="filesData[posts[file.index].id]"
          :post="posts[file.index]"
        />
      </div>
    </div>
</template>

<script>
    import dialogComponent from '@/components/posts_components/dialogComponent.vue';
    export default {
        name: 'userContent',
        components: {
          dialogComponent
        },
        props: [
            'files',
            'posts',
            'dialog',
            'filesData'
        ]
    }
</script>

<style lang="scss" scoped>

</style>