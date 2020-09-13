<template>
    <div>
        <!--Each post is displayed using a dialog template, so when you click one of the images, a dialog box is open.-->
        <v-dialog v-model="dialog" height="auto" max-width="800">
          <!--Here starts the activator for the dialog box. The activator si the entire post.-->
          <template v-slot:activator="{ on, attrs }">
            <!--The following is the entire flex item described by the css from App.vue-->
            <div class="flexitem" v-bind="attrs" v-on="on" v-on:click="getSimilarPosts(post.id)">
              <postName :postTitle="post.title"/>
              <postDescription :postDescription="post.description"/>
              <img v-bind:src="'data:image/jpg;base64,'+ imageData" class="image" />
            </div>
          </template>
              <dialogBox :post="post" :imageData="imageData" :nrOfRecommendend="nrOfRecommendend" :similarFilesData="similarFilesData"/>
        </v-dialog>

    </div>
</template>

<script>
    import Vue from 'vue';
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
                dialog: this.postsDialog,
                similarFilesData: [],
                nrOfRecommendend: 0,
                errorReturn: null,
                axios: require('axios').default,
            }
        },
        props: [
            'postDialog',
            'imageData',
            'post'
        ],
        methods: {
            getSimilarPosts: async function(id){
              await this.axios({
                method: 'get',
                url: 'http://' + this.$store.state.server + ':3000/post/face/' + id,
                headers:{
                  'authorization': this.$store.state.token
                }
              }).then((response) => {
                var data = response.data.data;
                this.nrOfRecommendend = data.length;
                for(var increment = 0; increment < data.length; increment++){
                  var bytes = data[increment].data;
                  Vue.set(this.similarFilesData, increment, bytes);
                }
                this.$store.dispatch("addToken", response.data.token);
              }).catch((error)=>{
                console.log(error.response.status + ': ' + error.response.statusText);
                this.$store.dispatch("addToken", 'undefined');
                this.$forceUpdate();
                this.errorReturn = 'You have been logged out! Please go login again!';
              })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>