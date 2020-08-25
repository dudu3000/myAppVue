<template>
  <div id="app">
    <main v-on:click="getPosts(false, false)">
      <v-container>
        <v-col cols="12">
          <v-row>
            <v-card
            width="100%"
            class="ma-3 pa-6 red accent-2"
            dark
            outlined
            centered
            justify="center"
            height="1300px"
            >
              <h1>Search</h1>
                <b>Welcome</b><br>
                <div v-if="$store.state.token !== 'undefined'">

                <v-text-field
                  label="Search"
                  required
                  placeholder="Username"
                  v-model="username"
                  @keypress="getPosts(false, false)"
                ></v-text-field>
                
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts()">Search user profile</v-btn><br>
                  <br>

                  <!--Display the buttons for next page and prev page if they exist-->
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts(true, false)" v-if="prevPage !== ''">Previous page</v-btn>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts(false, true)" v-if="nextPage !== ''" class="right">Next page</v-btn><br><br>
  

                  <!--Here starts the isplay of the posts and implemented dialog boxes.-->
                  <div class="flex">




                    <!--"For" used to display 6 posts. Files variable stores the files from HTTP response.-->
                    <div v-for="file in files" :key="file.name" style="width: 30%; height: auto;">
                      <div v-if="postId[getPostIdIncrement-1] !== posts[file.index].id & getPostIdIncrement < 6">{{ getPostId(posts[file.index].id) }}</div>
                      <div v-if="postsIncrement < files.length & executeGetEachFileOnce == 1">{{getEachFile(postId[postsIncrement])}}</div>
                      <!--Each post is displayed using a dialog template, so when you click one of the images, a dialog box is open.-->
                      <v-dialog
                        v-model="dialog[file.index]"
                        height="auto"
                        max-width="800"
                      >
                        <!--Here starts the activator for the dialog box. The activator si the entire post.-->
                        <template v-slot:activator="{ on, attrs }">
                          <!--The following is the entire flex item described by the css from App.vue-->
                          <div class="flexitem"
                                v-bind="attrs"
                                v-on="on">
                          <div class="title">
                            <!--Display the title for each post in this "for"-->
                            <h3>{{ posts[file.index].title }}</h3>
                          </div>
                          <div class="description">
                            <!--The following logic checks if the description is longer than 15 characters. If it is, si displayes only 10 characters and add "..."-->
                            <div v-if="posts[file.index].description.length > 15" style="display: inline-flex;">
                              <h4 v-for="index in 14" :key="index">
                                {{ posts[file.index].description[index-1] }}
                                <!--If the descripton is empty, display an empty space so the row of the description to be displayed.-->
                                <div v-if="posts[file.index].description[index-1] == ' '"><pre> </pre></div>
                              </h4>
                              <h4>...</h4>
                            </div>
                            <div v-if="posts[file.index].description.length <= 15">
                              <h4>{{ posts[file.index].description }}</h4>
                            </div>
                            <div v-if="posts[file.index].description == ''">
                              <pre> </pre>
                            </div>
                          </div>
                            <img v-bind:src="'data:image/jpg;base64,'+ filesData[posts[file.index].id]" class="image" />
                            <!--TODO Create a function that store the id and display image using it-->
                          </div>
                        </template>
                        <!--Here starts the content of the dialog box. The following is the header of the dialog box displaying the title.-->
                        <div></div>
                        <v-card>
                          <v-card-title class="headline red lighten-2" color="red accent-4">
                            {{ posts[file.index].title }}
                          </v-card-title>
                          <!--Display the entire description.-->
                          <v-card-text>
                           {{ posts[file.index].description }}
                          </v-card-text>
                          <!--Display the entire image.-->
                          <v-divider></v-divider><br>
                          <v-card-text class=text-center>
                            <img v-bind:src="'data:image/jpg;base64,'+ filesData[posts[file.index].id]" class="imageDialog" />
                          </v-card-text>



                          <v-card-text>
                           <div>Estimated age: {{ (posts[file.index].faceDetection.AgeRange.Low + posts[file.index].faceDetection.AgeRange.High)/2 }}</div>
                           <div>Mood: {{ posts[file.index].faceDetection.Emotions[0].Type }}</div>
                           <div v-if="posts[file.index].faceDetection.Beard.Value"><img src="../assets/beard.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Eyeglasses.Value"><img src="../assets/eyeglasses.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Sunglasses.Value"><img src="../assets/sunglasses.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Gender.Value == 'Male'"><img src="../assets/man.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Gender.Value == 'Female'"><img src="../assets/female.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Emotions[0].Confidence > 70"><img src="../assets/smile.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Emotions[0].Confidence > 30 && posts[file.index].faceDetection.Emotions[0].Confidence <= 70"><img src="../assets/neutralFace.png" class="logo"></div>
                           <div v-if="posts[file.index].faceDetection.Emotions[0].Confidence <= 30"><img src="../assets/sad.png" class="logo"></div>

                          </v-card-text>





                        </v-card>
                      </v-dialog>
                    </div>
                  </div>
                </div><br>
          </v-card>
          </v-row>
        </v-col>
      </v-container>
    </main>
  </div>
 
</template>



<script>
import Vue from 'vue'
export default { 
  name: 'home',
  data(){
      return {
        page: 1,
        dialog: [],
        firstCall: 0,
        posts: [],
        files: [],
        filesData: [],
        prevPage: '',
        nextPage: '',
        postId: [0],
        postsIncrement: 0,
        inProgres: -1,
        getPostIdIncrement: 0,
        executeGetEachFileOnce: 1,
        username: '',
        axios: require('axios').default,
      }
  },
  methods:{
    console: function(test){
      console.log(test);
    },
    getPostId: function(id){
      this.postId[this.getPostIdIncrement] = id;
      this.getPostIdIncrement++;
    },
    getEachFile: function(id){
      this.executeGetEachFileOnce = 0;
      this.inProgres = this.postId[this.postsIncrement]
      this.postsIncrement++;
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/post/' + id,
        headers:{
          'authorization': this.$store.state.token
        }
      }).then((response) => {
          var bytes = response.data.data.data;
          this.executeGetEachFileOnce = 1;
          this.filesData[id] = new Uint8Array(bytes);
          Vue.set(this.filesData, id, this.encode(this.filesData[id]));
      })
    },
    getPosts: function(prev = false, next = false){
      //Reset used variables.
      this.getPostIdIncrement = 0;
      this.postsIncrement = 0;
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

      //Send request for users information from token
      this.axios({
        method: 'post',
        url: 'http://localhost:3000/post?page=' + this.page + '&limit=6',
        headers:{
          'authorization': this.$store.state.token
        },
        data:{
          userName: this.username
        }
      }).then((response) => {
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
        }, 
        (error) => {
          this.errorReturn = 'There went something wrong!';
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