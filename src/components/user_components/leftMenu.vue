<template>
  <div>
    <template>
        <v-navigation-drawer
          permanent
          expand-on-hover
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img v-bind:src="'data:image/jpg;base64,'+ user.profilePicture"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">{{user.firstName}} {{user.lastName}}</v-list-item-title>
                <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list
            nav
            dense
          >
            <v-list-item link v-on:click="Post()">
              <v-list-item-icon>
                <v-icon>mdi-folder-upload</v-icon>
              </v-list-item-icon>
              <v-list-item-title><h3>Make a post</h3></v-list-item-title>
            </v-list-item>
            <v-list-item link v-on:click="OtherUser()">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title><h3>Search for users</h3></v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-border-color</v-icon>
              </v-list-item-icon>
              <v-list-item-title><h3>Edit your profile</h3></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </template>
  </div>
</template>


<script>
  export default {
        name: 'leftMenu',
        props: [
            'user'
        ],
        methods:{
            
            Post: function(){
              this.$store.dispatch('goToPage', 'post');
            },
            OtherUser: function(){
              this.$store.dispatch('goToPage', 'otheruser');
            },
        }
  }
</script>

<style scoped>
</style>