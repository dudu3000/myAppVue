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
            height="auto"
            >
              <h1>Home</h1>
                <b>Welcome</b><br>
                <div v-if="$store.state.token == 'undefined'">Please login. If you don't have an account, go and create one.</div>
          
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
                  <br>
                  <br>

                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsPrevPage()" v-if="prevPage !== ''">Previous page</v-btn>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsNextPage()" v-if="nextPage !== ''" class="right">Next page</v-btn>
  

                  <div class="flex">
                    <div v-for="file in files" :key="file.name">
                      <div class="title">
                        <h2>{{ posts[file.index].title }}</h2>
                      </div>
                      <div>
                        <h3>{{ posts[file.index].description }}</h3>
                      </div>
                      <img :src="require('./../../../../myappGit/db/photos/' + `${file.name}` + '.jpg')" class="image">
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
          this.errorReturn = 'Failed to login. Incorrect username or password!'; 
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
          this.errorReturn = 'Failed to login. Incorrect username or password!'; 
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
          this.errorReturn = 'Failed to login. Incorrect username or password!'; 
          console.log(error);
          this.validReturn = null;
        });

    }
  }
}
</script>




<style>
.container{
  padding: 20px;
}

.flex{
  display: flex;
  width: 100%;
  height: 1300px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.image{
  width:500px;
  height: 500px;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 20px 20px 10px #000000;
}

.right{
  float: right;
}

.title{
  font-weight: bold;
  font-style: italic;
  text-shadow: 3px 3px #000000;
  border-bottom: 2px solid #000000;
}
</style>