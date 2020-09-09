<template>
    <div v-if="post">
        <v-card>
          <v-card-title class="headline red lighten-2" color="red accent-4">
            {{ post.title }}
          </v-card-title>
          <!--Display the entire description.-->
          <v-card-text>
           {{ post.description }}
          </v-card-text>
          <!--Display the entire image.-->
          <v-divider></v-divider><br>
          <v-card-text class=text-center>
            <img v-bind:src="'data:image/jpg;base64,'+ imageData" class="imageDialog" />
          </v-card-text>
          <!--Display the entire image.-->
          <v-divider></v-divider><br>

            <awsParameters :postFaceDetection = "post.faceDetection"/>

          <v-divider></v-divider>

            <similarImages :nrOfRecommendend="nrOfRecommendend" :similarFilesData="similarFilesData"/>

          <v-divider></v-divider>
          <v-card-text class=text-center><br>

            <v-btn target="_blank" class="right" color="red accent-4" dark rounded v-if="$store.state.page == 'home'" v-on:click="DeletePost(post.id)"> Delete this post </v-btn><br><br>

          </v-card-text>
        </v-card>

    </div>
</template>

<script>
    import awsParameters from '@/components/posts_components/awsParameters.vue';
    import similarImages from '@/components/posts_components/similarImages.vue';
    export default {
        name: 'dialogBox',
        props:[
            'post',
            'imageData',
            'nrOfRecommendend',
            'similarFilesData'
        ],
        components: {
          awsParameters,
          similarImages
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