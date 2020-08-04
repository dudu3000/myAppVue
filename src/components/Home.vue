<template>
  <div id="app">
    <main>
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
            >
              <h1>Home</h1>
                <b>Welcome</b><br>
                <div v-if="$store.state.token == 'undefined'">Please login. If you don't have an account, go and create one.</div>

                <div v-if="$store.state.token !== 'undefined'">
                  {{ getPosts() }}
                  In the future, you'll see your files here
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
        posts: {},
        files: {},
        axios: require('axios').default,
      }
  },
  methods:{
    getPosts: function(){
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
          this.posts = response.data.posts;
          this.files = response.data.files;
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
.container{
  padding: 20px;
}


</style>