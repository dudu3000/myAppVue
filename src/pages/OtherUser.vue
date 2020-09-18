<template>
  <div id="app">
    <main>
      <v-container>
        <v-col cols="12">
          <v-row>
            <v-card width="100%" class="ma-3 pa-6 background-card" dark outlined centered justify="center" height="1300px">
              <h1>Search</h1>
                <b>Welcome</b><br>
                
                  <v-alert
                      color="#C51162"
                      dark
                      icon="mdi-material-design"
                      border="right"
                      v-if="errorReturn !== null"
                  >{{errorReturn}}</v-alert>
                <div v-if="$store.state.token !== 'undefined'">

                <v-text-field label="Search" required placeholder="Username" v-model="userName" @keypress="getPosts(false, false)"></v-text-field>
                
                  <v-btn large color="indigo lighten-1" v-on:click="getPosts()">Search user profile</v-btn><br><br>
                  <profile v-if="errorReturn == null & userName !== ''" :user="userData"/>
                  <!--Display the buttons for next page and prev page if they exist-->
                  <v-btn large color="indigo lighten-1" v-on:click="getPosts(true, false)" v-if="prevPage !== ''"><h1><span>&#60;</span> </h1><pre> </pre> Previous page</v-btn>
                  <v-btn large color="indigo lighten-1" v-on:click="getPosts(false, true)" v-if="nextPage !== ''" class="right">Next page <pre> </pre><h1>></h1></v-btn><br><br>
  
                  <userContent :files="files" :posts="posts" :dialog="dialog" :filesData="filesData"/>                  

                </div><br>
          </v-card>
          </v-row>
        </v-col>
      </v-container>
    </main>
  </div>
 
</template>



<script>
import Vue from 'vue';
import profile from '@/components/user_components/profile.vue';
import userContent from './../components/posts_components/userContent.vue';
export default { 
  name: 'home',
  data(){
      return {
        page: 1,
        dialog: [],
        
        posts: [],
        files: [],
        filesData: [],
        prevPage: '',
        nextPage: '',
        userName: '',
        userData: '',
        errorReturn: null,
        axios: require('axios').default,
      }
  },
  components: {
    userContent,
    profile,
  },
  methods:{
    console: function(test){
      console.log(test);
    },



  
    getEachFile: async function(id){
      await this.axios({
        method: 'get',
        url: 'http://' + this.$store.state.server + ':3000/post/' + id,
        headers:{
          'authorization': this.$store.state.token
        }
      }).then((response) => {
          var bytes = response.data.data;
          Vue.set(this.filesData, id, bytes);
      })
    },

    
    getProfilePicture: function(id){
        //Send request for users information from token
        this.axios({
            method: 'get',
            url: 'http://' + this.$store.state.server + ':3000/post/' + id,
            headers:{
              'authorization': this.$store.state.token
            }
        }).then((response)=>{
        this.userData.profilePicture = response.data.data;
        }).catch((error)=>{
            console.log(error);
        });
    },










    getPosts: function(prev = false, next = false){
      //Reset used variables.
      this.files = [];
      this.posts = [];
      this.firstCall = 1;

      //Set dialog boxes to false(everytime the function is called)
      for(var i = 0; i < 6; i++)
        this.dialog[i] = false;

      //Check if the function is called from one of the next/prev page button
      if(prev){
        this.page--;
      }
      if(next){
        this.page++;
      }

        this.axios({
          method: 'post',
          url: 'http://' + this.$store.state.server + ':3000/post?page=' + this.page + '&limit=6',
          headers:{
            'authorization': this.$store.state.token
          },
          data:{
            userName: this.userName
          }
        }).then(async (response) => {
          this.userData = response.data.user;
          this.errorReturn = null;
          this.posts = response.data.result.posts.results;
          this.files = response.data.result.files.results;



          if(response.data.result.posts.next !== undefined)
            this.nextPage = response.data.result.posts.next;
          else
            this.nextPage = '';



          if(response.data.result.posts.previous !== undefined)
            this.prevPage = response.data.result.posts.previous;
          else
            this.prevPage = '';



          var increment = 0;
          this.getProfilePicture(this.userData.profilePicture);
          while(increment < this.files.length){
            await this.getEachFile(this.posts[increment].id);
            increment++;
          }

          this.$store.dispatch("addToken", response.data.token);
        }).catch((error)=>{
            this.$forceUpdate();
            this.errorReturn = error.response.data.error;
            console.log(error.response.status + ': ' + error.response.data.error);
        });

      
    },

  },
}
</script>




<style>
</style>