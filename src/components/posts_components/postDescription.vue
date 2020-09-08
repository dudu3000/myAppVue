<template>

      <div class="description">
        <div v-if="postDescription.length > 15" style="display: inline-flex;">
          <h4 v-for="index in 14" :key="index">
            {{ postDescription[index-1] }}
            <div v-if="postDescription[index-1] == ' '"><pre> </pre></div>
          </h4>
          <h4>...</h4>
        </div>
        <div v-if="postDescription.length <= 15">
          <h4>{{ postDescription }}</h4>
        </div>
        <div v-if="postDescription == ''">
          <pre> </pre>
        </div>
      </div> 

</template>

<script>
    export default {
        name: 'postDescription',
        data(){
            return {
            }
        },
        props: 
          [
            'postDescription'
          ]
    }
</script>

<style scoped>

</style>