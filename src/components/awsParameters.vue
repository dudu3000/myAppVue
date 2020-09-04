<template>
    <div v-if="postFaceDetection !== ''">
          <v-card-text>
           <div>Estimated age: {{ (postFaceDetection.AgeRange.Low + postFaceDetection.AgeRange.High)/2 }}</div>
           <div>Mood: {{ postFaceDetection.Emotions[0].Type }}</div>
           <div v-if="postFaceDetection.Beard.Value"><img src="../assets/beard.png" class="logo"></div>
           <div v-if="postFaceDetection.Eyeglasses.Value & !postFaceDetection.Sunglasses.Value"><img src="../assets/eyeglasses.png" class="logo"></div>
           <div v-if="postFaceDetection.Sunglasses.Value"><img src="../assets/sunglasses.png" class="logo"></div>
           <div v-if="postFaceDetection.Gender.Value == 'Male'"><img src="../assets/man.png" class="logo"></div>
           <div v-if="postFaceDetection.Gender.Value == 'Female'"><img src="../assets/female.png" class="logo"></div>
           <div v-if="postFaceDetection.Emotions[0].Confidence > 70"><img src="../assets/smile.png" class="logo"></div>
           <div v-if="postFaceDetection.Emotions[0].Confidence > 30 && postFaceDetection.Emotions[0].Confidence <= 70"><img src="../assets/neutralFace.png" class="logo"></div>
           <div v-if="postFaceDetection.Emotions[0].Confidence <= 30"><img src="../assets/sad.png" class="logo"></div>
          </v-card-text>
    </div>
</template>


<script>
export default{
    name: 'awsParameters',
    props: [
        'postFaceDetection'
    ]

}
</script>


<style>
</style>