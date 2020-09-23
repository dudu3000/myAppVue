<template>
    <div style="display: inline-flex; width:100%;">
        <div v-for="(imgages, index) in similarFilesData" :key="imgages" style="width: 25%;">
            <a><img v-bind:src="'data:image/jpg;base64,'+ imgages" class="recomandedImage similarImage" v-on:click="goToUserPage(index)"/></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'similarImages',
        props: [
            'similarFilesData',
            'nrOfRecommendend',
            'usersOfSimilarPosts'
        ],
        data(){
            return {
                filesData: [],
                axios: require('axios').default,
            }
        },
        methods: {
            goToUserPage: function(index){
                this.$store.dispatch('updateSimilarUser', this.usersOfSimilarPosts[index]);
                this.$store.dispatch('goToPage', 'otheruser');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .similarImage{
        transition: 0.5s;
    }
    .similarImage:hover{
        -webkit-transform: scale(1.03);
        -ms-transform: scale(1.03);
        transform: scale(1.03);
        transition: 0.5s;
    }
</style>