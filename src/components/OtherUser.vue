<template>
  <div id="app">
    <main v-on:click="getPosts()">
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
                  @keypress="getPosts"
                ></v-text-field>
                
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPosts()">Search user profile</v-btn><br>
                  <br>

                  <!--Display the buttons for next page and prev page if they exist-->
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsPrevPage()" v-if="prevPage !== ''">Previous page</v-btn>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsNextPage()" v-if="nextPage !== ''" class="right">Next page</v-btn><br><br>
  
                  <!--Here starts the isplay of the posts and implemented dialog boxes.-->
                  <div class="flex">

                    <!--"For" used to display 6 posts. Files variable stores the files from HTTP response.-->
                    <div v-for="file in files" :key="file.name" style="width: 30%; height: auto;">




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
                          <img :src="require('./../../../myappGit/db/photos/' + `${file.name}` + '.jpg')" class="image">
                          </div>




                        </template>
                        <!--Here starts the content of the dialog box. The following is the header of the dialog box displaying the title.-->
                        <div></div>
                        <v-card
                        >
                
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
                            
                            <img :src="require('./../../../myappGit/db/photos/' + `${file.name}` + '.jpg')" class="imageDialog">
                          </v-card-text>

                          
                        </v-card>
                      </v-dialog>
                    </div>
                  </div>
                </div>
          </v-card>
          </v-row>
        </v-col>
      </v-container>
    </main>
  </div>
 
</template>




<script>
export default { 
  name: 'otheruser',
  data(){
      return {
        page: 1,
        posts: [],
        dialog: [6],
        prevPage: '',
        nextPage: '',
        username: '',
        files: [],
        postId: 0,
        postTitle: '',
        axios: require('axios').default,
      }
  },
  methods:{
    getPosts: function(){
        this.dialog[0] = false;
        this.dialog[1] = false;
        this.dialog[2] = false;
        this.dialog[3] = false;
        this.dialog[4] = false;
        this.dialog[5] = false;
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

    getPostsNextPage: function(){
      this.page += 1;
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

    
    getPostsPrevPage: function(){
      this.page -= 1;
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

    }
  }
}
</script>




<style>
</style>