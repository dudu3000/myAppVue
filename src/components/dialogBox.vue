<template>
    <div v-if="file !== ''">
        <v-card>
          <v-card-title class="headline red lighten-2" color="red accent-4">
            {{ postsOfFileIndex.title }}
          </v-card-title>
          <!--Display the entire description.-->
          <v-card-text>
           {{ postsOfFileIndex.description }}
          </v-card-text>
          <!--Display the entire image.-->
          <v-divider></v-divider><br>
          <v-card-text class=text-center>
            <img v-bind:src="'data:image/jpg;base64,'+ filesData[postsOfFileIndex.id]" class="imageDialog" />
          </v-card-text>
          <!--Display the entire image.-->
          <v-divider></v-divider><br>

            <awsParameters :postFaceDetection = "postsOfFileIndex.faceDetection"/>

          <v-divider></v-divider>
          <v-card-text class=text-center><br>

            <v-btn target="_blank" class="right" color="red accent-4" dark rounded v-if="$store.state.page == 'home'" v-on:click="DeletePost(postsOfFileIndex.id)"> Delete this post </v-btn><br><br>

          </v-card-text>
        </v-card>

    </div>
</template>

<script>
    import awsParameters from './awsParameters.vue';
    export default {
        name: 'dialogBox',
        props:[
            'postsOfFileIndex',
            'file',
            'filesData'
        ],
        components: {
          awsParameters
        },
        methods: {
          DeletePost: function(id){
            this.$store.dispatch('updateIdPostToBeDeleted', id);
            this.$store.dispatch('goToPage', 'delete')
          },
        }
    }
</script>

<style lang="scss" scoped>

</style>