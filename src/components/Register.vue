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

          <h1>Register</h1>
          <v-alert      
            color="#C51162"
            dark
            icon="mdi-material-design"
            border="right"
            v-if="errorReturn !== null"
          >
            {{errorReturn}}
          </v-alert>          
          <v-alert
            type="success"
            v-if="validReturn !== null"
          >
            {{validReturn}}
          </v-alert>



          <v-text-field
            label="First name"
            required
            placeholder="First name"
            v-model="firstName"
          ></v-text-field>
          <v-text-field
            label="Last name"
            required
            placeholder="Last name"
            v-model="lastName"
          ></v-text-field>
          <v-text-field
            label="Username"
            required
            placeholder="User name"
            v-model="username"
          ></v-text-field>
          <v-text-field
            label="Password"
            required
            placeholder="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-text-field
            label="Repeat Password"
            required
            placeholder="Repeat Password"
            type="password"
            v-model="rpassword"
          ></v-text-field>
          <v-text-field
            label="Email"
            required
            placeholder="Email Adress"
            type="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Birth day"
            required
            type="date"
            v-model="bday"
          ></v-text-field>

          <v-btn rounded color="yellow darken-4" dark v-on:click="register()">Create account</v-btn>

            </v-card>
          </v-row>
        </v-col>
      </v-container>
    </main>
  </div>

</template>




<script>

export default { 
  name: 'register',
  data(){
    return {
      validReturn: null,
      errorReturn: null,
      firstName: null,
      lastName: null,
      username: null,
      password: null,
      rpassword: null,
      email: null,
      bday: null,
      axios: require('axios').default,
    }
  },

  methods: {
    register () {
        if(this.password !== this.rpassword){
            this.errorReturn = 'You must insert the same password!';
            return;
        }
        this.axios.post('http://localhost:3000/user', {
          "firstName": this.firstName,
          "lastName": this.lastName,
          "userName": this.username,
          "password": this.password,
          "email": this.email,
          "birthDay": this.bday
        }).then((response) => {
            if(response.status == 201){
                this.validReturn = response.data.text;
                this.errorReturn = null;
            }else{
                this.errorReturn = response.data.error; 
                this.validReturn = null;
            }
          },(error) => {
            this.errorReturn = error.response.data.error; 
            this.validReturn = null;
            console.log(error);
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