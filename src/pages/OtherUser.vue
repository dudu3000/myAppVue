<template>
  <div id="app">
    <main>
      <v-container>
        <v-col cols="12">
          <v-row>
            <v-card width="100%" class="ma-3 pa-6 red accent-2" dark outlined centered justify="center" height="1300px">
              <h1>Search</h1>
                <b>Welcome</b><br>
                <div v-if="$store.state.token !== 'undefined'">

                <v-text-field label="Search" required placeholder="Username" v-model="userName" @keypress="getPosts(false, false)"></v-text-field>
                
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts()">Search user profile</v-btn><br><br>

                  <!--Display the buttons for next page and prev page if they exist-->
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts(true, false)" v-if="prevPage !== ''">Previous page</v-btn>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts(false, true)" v-if="nextPage !== ''" class="right">Next page</v-btn><br><br>
  
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
import userContent from './../components/userContent.vue';
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
        axios: require('axios').default,
      }
  },
  components: {
    userContent
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
          var bytes = response.data.data.data;
          Vue.set(this.filesData, id, this.encode(new Uint8Array(bytes)));
      })
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
          this.posts = response.data.posts.results;
          this.files = response.data.files.results;



          if(response.data.posts.next !== undefined)
            this.nextPage = response.data.posts.next;
          else
            this.nextPage = '';



          if(response.data.posts.previous !== undefined)
            this.prevPage = response.data.posts.previous;
          else
            this.prevPage = '';



          var increment = 0;
          while(increment < this.files.length){
            await this.getEachFile(this.posts[increment].id, i);
            increment++;
            console.log(increment)
          }
          
        }, 
        (error) => {
          this.errorReturn = 'Failed to login. Incorrect username or password!'; 
          console.log(error);
          this.validReturn = null;
        });
      
    },







    
    encode: function(input) {
      var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      while (i < input.length) {
          chr1 = input[i++];
          chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
          chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }
          output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
      }
      return output;
    }
  }
}
</script>




<style>
</style>