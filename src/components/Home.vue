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
            height="800px"
            >
              <h1>Home</h1>
                <b>Welcome</b><br>
                <div v-if="$store.state.token == 'undefined'">Please login. If you don't have an account, go and create one.</div>
          
                <div v-if="$store.state.token !== 'undefined'">

                  <div v-if="firstCall == 0">
                    {{ getPosts() }}
                  </div>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsPrevPage()" v-if="prevPage !== ''">Previous page</v-btn>
                  <v-btn rounded color="yellow darken-4" dark v-on:click="getPostsNextPage()" v-if="nextPage !== ''" class="right">Next page</v-btn>
  

                  <div class="flex">
                    <div v-for="file in files" :key="file.name" style="width: 30%; height: auto;">
                      <div class="flexitem">
                      <div class="title">
                        <h3>{{ posts[file.index].title }}</h3>
                      </div>
                      <div class="description">
                        <h4>{{ posts[file.index].description }}</h4>
                      </div>
                      <img :src="require('./../../../../myappGit/db/photos/' + `${file.name}` + '.jpg')" class="image">
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
  name: 'home',
  data(){
      return {
        page: 1,
        posts: [],
        prevPage: '',
        nextPage: '',
        firstCall: 0,
        files: [],
        postId: 0,
        postTitle: '',
        axios: require('axios').default,
      }
  },
  methods:{
    getPosts: function(){
      this.firstCall = 1;
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/user/info',
        headers:{
          'authorization': this.$store.state.token
        }
      }).then((response)=>{
        this.axios({
          method: 'post',
          url: 'http://localhost:3000/post?page=' + this.page + '&limit=6',
          headers:{
            'authorization': this.$store.state.token
          },
          data:{
            userName: response.data.userName
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
      })
      
    },

    getPostsNextPage: function(){
      this.page += 1;
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/user/info',
        headers:{
          'authorization': this.$store.state.token
        }
      }).then((response)=>{
        this.axios({
          method: 'post',
          url: 'http://localhost:3000/post?page=' + this.page + '&limit=6',
          headers:{
            'authorization': this.$store.state.token
          },
          data:{
            userName: response.data.userName
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
      })

    },

    
    getPostsPrevPage: function(){
      this.page -= 1;
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/user/info',
        headers:{
          'authorization': this.$store.state.token
        }
      }).then((response)=>{
        this.axios({
          method: 'post',
          url: 'http://localhost:3000/post?page=' + this.page + '&limit=6',
          headers:{
            'authorization': this.$store.state.token
          },
          data:{
            userName: response.data.userName
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
      })

    }
  }
}
</script>




<style>
</style>