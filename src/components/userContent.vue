<template>
    <div v-if="files !== ''">

                  <!--Here starts the isplay of the posts and implemented dialog boxes.-->
                  <div class="flex">
                    <!--"For" used to display 6 posts. Files variable stores the files from HTTP response.-->
                    <div v-for="file in files" :key="file.name" style="width: 30%; height: auto;">
                      <!--Each post is displayed using a dialog template, so when you click one of the images, a dialog box is open.-->
                      <v-dialog v-model="dialog[file.index]" height="auto" max-width="800">
                        <!--Here starts the activator for the dialog box. The activator si the entire post.-->
                        <template v-slot:activator="{ on, attrs }">
                          <!--The following is the entire flex item described by the css from App.vue-->
                          <div class="flexitem" v-bind="attrs" v-on="on">

                            <postName :file="file" :posts="posts"/>
                            <description :file="file" :posts="posts"/>
                            <img v-bind:src="'data:image/jpg;base64,'+ filesData[posts[file.index].id]" class="image" />

                          </div>
                        </template>

                            <dialogBox :file="file" :postsOfFileIndex="posts[file.index]" :filesData="filesData"/>

                      </v-dialog>
                    </div>
                  </div>
    </div>
</template>

<script>
    import description from './description.vue';
    import postName from './postName.vue';
    import dialogBox from './dialogBox.vue';
    export default {
        name: 'userContent',
        components: {
          description,
          postName,
          dialogBox
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