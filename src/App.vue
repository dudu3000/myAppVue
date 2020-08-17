<template>
  <v-app>
    <div v-if="$store.state.errorCode == 401">
      {{ $store.dispatch('goToPage', 'logout') }}
    </div>
    <v-app-bar
      app
      dark
      class="red"
    >
      <div class="d-flex align-center mr-4">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logo.png"
          width="100"
        />
      </div>

      <h1>myApp</h1>

      <v-spacer></v-spacer>





      <v-btn
        v-on:click="Home()"
        target="_blank"
        text
      >
        <span class="mr-2">Home</span>
      </v-btn>


      <v-btn
        v-if="$store.state.token !== 'undefined'"
        v-on:click="OtherUser()"
        target="_blank"
        text
      >
        <span class="mr-2">Search for users</span>
      </v-btn>


      <v-btn
        v-if="$store.state.token == 'undefined'"
        v-on:click="Login()"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>


      <v-btn
        v-if="$store.state.token == 'undefined'"
        v-on:click="Register()"
        target="_blank"
        text
      >
        <span class="mr-2">Register</span>
      </v-btn>

      
      <v-btn
        v-if="$store.state.token !== 'undefined'"
        v-on:click="Logout()"
        target="_blank"
        text
      >
        <span class="mr-2">Logout</span>
      </v-btn>




    </v-app-bar>

    <v-main>
      <Home v-if="$store.state.page == 'home'"></Home>
      <OtherUser v-if="$store.state.page == 'otheruser'"></OtherUser>
      <Login v-if="$store.state.page == 'login'"></Login>
      <Register v-if="$store.state.page == 'register'"></Register>
      <Logout v-if="$store.state.page == 'logout'" style="display: none;"></Logout>
      <Post v-if="$store.state.page == 'post'"></Post>
      <Delete v-if="$store.state.page == 'delete'"></Delete>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import OtherUser from './components/OtherUser';
import Post from './components/Post';
import Delete from './components/Delete';

export default {
  name: 'App',

  components: {
    Home,
    Login,
    Logout,
    Register,
    OtherUser,
    Post,
    Delete
  },

  data: () => ({
  }),

  methods: {
    Home: function(){
      this.$store.dispatch('goToPage', 'home');
    },
    Login: function(){
      this.$store.dispatch('goToPage', 'login');
    },
    Register: function(){
      this.$store.dispatch('goToPage', 'register');
    },
    Logout: function(){
      this.$store.dispatch('goToPage', 'logout');
    },
    OtherUser: function(){
      this.$store.dispatch('goToPage', 'otheruser');
    },
  }
};
</script>

<style>

.container{
  padding: 20px;
}

.flex{
  display: flex;
  width: 100%;
  height: 900px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.image{
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 15px 15px 10px #000000;
  transition: 0.5s;
  width:500px;
  max-width:100%;
  height:300px;
}

.image:hover{
  box-shadow: 0px 0px 10px #000000;
  transition: 0.5s;
  -webkit-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.right{
  float: right;
}
.flexitem{
  height:200px;
}
.title{
  font-weight: bold;
  font-style: italic;
  text-shadow: 2px 2px 7px #000000;
  border-bottom: 2px solid #ffffff;
  width:80%
}
.description{
  width: 200px;
}

.imageDialog{
  width: auto;
  height:auto;
  max-width:750px;
  max-height: 500px;
}
</style>