<template>
  <div id="app">
    <main>


      <v-container>
        <v-col cols="12">
          <v-row>
            <v-card
            width="100%"
            class="ma-3 pa-6 background-card"
            dark
            outlined
            centered
            justify="center"
            >

          <h1>Compose a post</h1>


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

          <form @submit.prevent="post" enctype="multipart/form-data">
            <div>
              
              <v-text-field
                label="Title"
                required
                placeholder="Title"
                v-model="title"
              ></v-text-field>
              <v-textarea
                label="Description"
                v-model="description"
              ></v-textarea>

              <label for="file">Upload File</label><br>
                <v-file-input
                  required
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Upload"
                  prepend-icon="mdi-camera"
                  label="Image"
                  ref="file"
                  v-model="file"
                ></v-file-input>

            </div>
            
            <button class="submit">SEND</button>

          </form>



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
      description: '',
      file: [],
      axios: require('axios').default,
    }
  },

  methods: {
    async post () {
        const formData = new FormData();
        formData.append("file", this.file);

        this.axios({
          method: 'post',
          url: 'http://' + this.$store.state.server + ':3000/post/upload',
          headers:{
            'authorization': this.$store.state.token
          },
          data: formData,
          params: {
            'title': this.title,
            'description': this.description
          }
        }).then((res) => {
            this.validReturn = res.data.text;
            this.errorReturn = null;

            this.title = null;
            this.description = '';
            this.file = '';
            this.$store.dispatch("addToken", res.data.token);
        }).catch((error)=>{
          this.errorReturn = error.response.message;
          console.log(error.response.status + ': ' + error.response.message) 
          this.validReturn = null;
          this.title = null;
          this.description = '';
          this.file = '';
          this.$store.dispatch("addToken", 'undefined');
          this.$forceUpdate();
        });
      

    }
  }
}

</script>




<style>

.container{
  padding: 20px;
}

.submit{
  background-color: #757575;
  padding: 7px;
  font-weight: 700;
  border-radius:5px;
  padding-left: 15px;
  padding-right: 17px;
  box-shadow: 0px 1px 1px #000000;
  font-family: Arial, Helvetica, sans-serif;
  transition: 0.5s;
}

.submit:hover{
  background-color: #858585;
  transition: 0.5s;
}

.submit:active{
  background-color: #858585;
  transition: 0.2s;
}
</style>