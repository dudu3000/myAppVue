<template>
    <div style="display: inline-flex; width:100%;">
        <div v-for="imgages in similarFilesData" :key="imgages" style="width: 25%;">
            <img v-bind:src="'data:image/jpg;base64,'+ imgages" class="recomandedImage"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'similarImages',
        props: [
            'similarFilesData',
            'nrOfRecommendend'
        ],
        data(){
            return {
                filesData: [],
                axios: require('axios').default,
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="scss" scoped>

</style>