<template>
  <div id="app">
    <main><div style="margin-top:0px;"></div>
    <v-row>
        <v-card width="100%" class="pa-6 background-card" dark>
        <div v-if="errorReturn == null">
          <h1>Are you sure you want to delete this post?</h1>
          
          <v-alert
            type="success"
            v-if="validReturn !== null"
          >
            {{validReturn}}
          </v-alert>

          <v-btn rounded color="yellow darken-4" dark v-on:click="deletePost()">Yes</v-btn>
          <v-btn rounded color="yellow darken-4" dark v-on:click="$store.dispatch('goToPage', 'home')">No</v-btn>
        </div>
        <v-alert      
          color="#C51162"
          dark
          icon="mdi-material-design"
          border="right"
          v-if="errorReturn !== null"
        >
          {{errorReturn}}
        </v-alert>
        <div v-if="errorReturn !== null">
          <v-btn rounded color="yellow darken-4" dark v-on:click="$store.dispatch('goToPage', 'home')">Go home</v-btn>
        </div>
        </v-card>
      </v-row>
    </main>
  </div>

</template>




<script>
export default { 
  name: 'login',
  data(){
    return {
      validReturn: null,
      errorReturn: null,
      token: 'undefined',
      axios: require('axios').default,
    }
  },

  methods: {
    deletePost () {
        this.axios({
          method: 'delete',
          url: 'http://' + this.$store.state.server + ':3000/post',
          headers:{
            'authorization': this.$store.state.token
          },
          data:{
            id: this.$store.state.idPostToBeDeleted
          }
        }).then((response) => {
          this.validReturn = response.data.text;
          this.errorReturn = null;
          this.$store.dispatch("addToken", response.data.token);
          this.$store.dispatch('goToPage', 'home');
        }).catch((error)=>{
          
          this.errorReturn = error.response.data.error;
          console.log(error.response.status + ': ' + error.response.data.error)
        });
      

    }
  }
}

</script>




<style>

.container{
  padding: 20px;
}


</style>

