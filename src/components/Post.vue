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

          <h1>Login</h1>
          
          <v-alert
            type="success"
            v-if="validReturn !== null"
          >
            {{validReturn}}
          </v-alert>

          <v-alert      
            color="#C51162"
            dark
            icon="mdi-material-design"
            border="right"
            v-if="errorReturn !== null"
          >
            {{errorReturn}}
          </v-alert>

          <form enctype="multipart/form-data" @submit.prevent="post">
          
          <v-text-field
            label="Title"
            required
            placeholder="Title"
            v-model="title"
          ></v-text-field>
          <v-text-field
            label="Description"
            placeholder="Description"
            v-model="description"
          ></v-text-field>
          
           <input type="file" ref="file" @change="selectFile"/>
          <v-btn rounded color="yellow darken-4" dark v-on:click="post()">Post</v-btn></form>

            </v-card>
          </v-row>
        </v-col>
      </v-container>
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
      title: null,
      description: null,
      file: null,
      token: 'undefined',
      axios: require('axios').default,
    }
  },

  methods: {
    selectFile(){
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    async post () {
        const formData = new FormData();
        formData.append('file', this.file);
        try{
        await this.axios.post('http://localhost:3000/post/upload', formData, {headers:{'authorization': this.$store.state.token}}, {'title': 'titleTest'}
        ).then(res => {
          console.log(res);
        });
        }catch(err){
          console.log(err);
        }




        // this.axios({
        //   method: 'post',
        //   url: 'http://localhost:3000/post/upload',
        //   headers:{
        //     'authorization': this.$store.state.token
        //   },
        //   data:{
        //       title: 'test',
        //       description: 'test',
        //       formDataa: JSON.stringify(this.file.size)
        //   },
        // }).then((response) => {
        //     this.$store.state.page = 'home';
        //     console.log(response);
        // }, 
        // (error) => {
        //   this.errorReturn = error; 
        //   console.log(error + formData);
        //   this.validReturn = null;
        // });
      

    }
  }
}

</script>




<style>

.container{
  padding: 20px;
}


</style>