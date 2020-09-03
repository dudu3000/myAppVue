<template>
    <div>
         <div v-if="file !== ''" class="description">
          <div v-if="posts[file.index].description.length > 15" style="display: inline-flex;">
            <h4 v-for="index in 14" :key="index">
              {{ posts[file.index].description[index-1] }}
              <div v-if="posts[file.index].description[index-1] == ' '"><pre> </pre></div>
            </h4>
            <h4>...</h4>
          </div>
          <div v-if="posts[file.index].description.length <= 15">
            <h4>{{ posts[file.index].description }}</h4>
          </div>
          <div v-if="posts[file.index].description == ''">
            <pre> </pre>
          </div>
        </div> 



    </div>
</template>

<script>
    export default {
        name: 'description',
        data(){
            return {
            }
        },
        props: 
          [
            'posts',
            'file'
          ]
    }
</script>

<style scoped>

</style>