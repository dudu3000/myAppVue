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
                Welcome<br>
                <b>Your token: </b>
                {{ $store.state.token }}

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
      }
  }
}
</script>




<style>
.container{
  padding: 20px;
}


</style>