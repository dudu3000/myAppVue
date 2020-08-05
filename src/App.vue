<template>
  <v-app>
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

      <v-btn
        v-on:click="Hello()"
        target="_blank"
        text
      >
        <span class="mr-2">Hello</span>
      </v-btn>




    </v-app-bar>

    <v-main>
      <Home v-if="$store.state.page == 'home'"></Home>
      <OtherUser v-if="$store.state.page == 'otheruser'"></OtherUser>
      <Login v-if="$store.state.page == 'login'"></Login>
      <Register v-if="$store.state.page == 'register'"></Register>
      <Logout v-if="$store.state.page == 'logout'" style="display: none;"></Logout>
      <HelloWorld v-if="$store.state.page == 'hello'"></HelloWorld>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import HelloWorld from './components/HelloWorld';
import OtherUser from './components/OtherUser';

export default {
  name: 'App',

  components: {
    Home,
    Login,
    Logout,
    Register,
    HelloWorld,
    OtherUser
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
    Hello: function(){
      this.$store.dispatch('goToPage', 'hello');
    },
    OtherUser: function(){
      this.$store.dispatch('goToPage', 'otheruser');
    },
  }
};
</script>
