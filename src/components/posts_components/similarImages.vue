<template>
    <div>
        <img v-bind:src="'data:image/jpg;base64,'+ similarFilesData[index*4 + 0]" class="recomandedImage" />
        <img v-bind:src="'data:image/jpg;base64,'+ similarFilesData[index*4 + 1]" class="recomandedImage" />
        <img v-bind:src="'data:image/jpg;base64,'+ similarFilesData[index*4 + 2]" class="recomandedImage" />
        <img v-bind:src="'data:image/jpg;base64,'+ similarFilesData[index*4 + 3]" class="recomandedImage" />
        {{index}}
    </div>
</template>

<script>
    export default {
        name: 'similarImages',
        props: [
            'similarFilesData',
            'index'
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