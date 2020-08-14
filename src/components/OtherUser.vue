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

                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsPrevPage()" v-if="prevPage !== ''">Previous page</v-btn>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsNextPage()" v-if="nextPage !== ''" class="right">Next page</v-btn>
  

                  <div class="flex">
                    <div v-for="file in files" :key="file.name" style="width: 30%; height: auto;">
                      <div class="flexitem">
                      <div class="title">
                        <h2>{{ posts[file.index].title }}</h2>
                      </div>
                      <div class="description">
                        <div v-if="posts[file.index].description.length > 15" style="display: inline-flex;">
                          <h4 v-for="index in 14" :key="index">
                            {{ posts[file.index].description[index-1] }}
                            <div v-if="posts[file.index].description[index-1] == ' '"><pre> </pre></div>
                          </h4>
                          <h4>...</h4>
                        </div>
                        <div v-if="posts[file.index].description.length <= 15">
                            <h4>{{ posts[file.index].description }}</h4>
                        </div>
                      </div>
                      <img :src="require('./../../../myappGit/db/photos/' + `${file.name}` + '.jpg')" class="image">
                      </div>
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