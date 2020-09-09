<template>
    <div style="display: inline-flex;">
        <div v-for="img in similarFilesData" :key="img" style="width: 25%;">
            <img v-bind:src="'data:image/jpg;base64,'+ img" class="recomandedImage"/>
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