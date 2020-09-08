<template>
    <div>
        <!--Each post is displayed using a dialog template, so when you click one of the images, a dialog box is open.-->
        <v-dialog v-model="dialog" height="auto" max-width="800">
          <!--Here starts the activator for the dialog box. The activator si the entire post.-->
          <template v-slot:activator="{ on, attrs }">
            <!--The following is the entire flex item described by the css from App.vue-->
            <div class="flexitem" v-bind="attrs" v-on="on">
              <postName :postTitle="post.title"/>
              <postDescription :postDescription="post.description"/>
              <img v-bind:src="'data:image/jpg;base64,'+ imageData" class="image" />
            </div>
          </template>
              <dialogBox :post="post" :imageData="imageData"/>
        </v-dialog>

    </div>
</template>

<script>
    import postDescription from '@/components/posts_components/postDescription.vue';
    import postName from '@/components/posts_components/postName.vue';
    import dialogBox from '@/components/posts_components/dialogBox.vue';
    export default {
        name: 'dialogComponent',
        components: {
            postDescription,
            postName,
            dialogBox
        },
        data(){
            return {
                dialog: this.postsDialog
            }
        },
        props: [
            'postDialog',
            'imageData',
            'post'
        ]
    }
</script>

<style lang="scss" scoped>

</style>