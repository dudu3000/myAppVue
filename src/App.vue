<template>
  <v-app>
    <div v-if="$store.state.errorCode == 401">
      {{ $store.dispatch('goToPage', 'logout') }}
    </div>
    <v-app-bar
      app
      dark
      color="#0097a7"
    >
      <div class="d-flex align-center mr-4">
      </div>

      <h1>SelfieNet</h1>

      <v-spacer></v-spacer>





      <v-btn
        v-on:click="Home()"
        target="_blank"
        text
      >
        <span class="mr-2">Home</span>
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

    <v-main style="background-color: #212121;">
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
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import OtherUser from './pages/OtherUser';
import Post from './pages/Post';
import Delete from './pages/Delete';

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
  justify-content: center;
  align-content: start;
}

.image{
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ffffff;
  transition: 0.5s;
  width:500px;
  max-width:100%;
  height:300px;
  -webkit-box-shadow: -93px 93px 0px -85px #ffffff, 93px -93px 0px -85px #ffffff;
  -moz-box-shadow: -93px 93px 0px -85px #ffffff, 93px -93px 0px -85px #ffffff;
  box-shadow: -93px 93px 0px -85px #ffffff, 93px -93px 0px -85px #ffffff;
}

.image:hover{
  box-shadow: 5px 5px 10px #ffffff;
  transition: 0.5s;
  -webkit-transform: scale(1.03);
  -ms-transform: scale(1.03);
  transform: scale(1.03);
  -webkit-box-shadow: 93px 93px 0px -85px #ffffff, -93px -93px 0px -85px #ffffff;
  -moz-box-shadow: 93px 93px 0px -85px #ffffff, -93px -93px 0px -85px #ffffff;
  box-shadow: 93px 93px 0px -85px #ffffff, -93px -93px 0px -85px #ffffff;
}

.right{
  float: right;
}
.flexitem{
  height:auto;
  margin: 5% 5% 5% 5%;
}
.title{
  font-weight: bold;
  font-style: italic;
  text-shadow: 2px 2px 7px #000000;
  border-bottom: 2px solid #ffffff;
  width:100%;
  margin-bottom: 5px;
}

.description{
  width: 200px;
  padding-bottom: 10px;
}

.imageDialog{
  width: auto;
  height:auto;
  max-width:750px;
  max-height: 500px;
}

.logo{
  max-width:40px;
  height: auto;
}

.logoFlex{
  display: flex;
  flex-direction: column;;
}

.recomandedImage{
  object-fit: cover;
  width:100%;
  height: 150px;
}


.EachPost{
  margin: 5% 5% 5% 5%;
  padding: 5px;
  padding-top: 1px;
  border-top: 20px solid #0097a7;
  -webkit-box-shadow: 93px 93px 0px -90px #ffffff, -93px -93px 0px -90px #ffffff;
  -moz-box-shadow: 93px 93px 0px -90px #ffffff, -93px -93px 0px -90px #ffffff;
  box-shadow: 93px 93px 0px -90px #ffffff, -93px -93px 0px -90px #ffffff;
  transition: 0.5s;
}

.EachPost:hover{
  -webkit-box-shadow: -93px 93px 0px -90px #ffffff, 93px -93px 0px -90px #ffffff;
  -moz-box-shadow: -93px 93px 0px -90px #ffffff, 93px -93px 0px -90px #ffffff;
  box-shadow: -93px 93px 0px -90px #ffffff, 93px -93px 0px -90px #ffffff;
  transition: 0.5s;
}


.profile {
  object-fit: cover;
  width: 250px;
  height: 250px;
  border-radius: 150px;
}


</style>