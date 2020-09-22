<template>
    <div>
        <div>
            <div v-if="$store.state.editState == true & valueOfInputState == 0">{{putDataToInputs()}}</div>
            <h2 style="display: inline-flex; width: 100%;">
                <div class="conta">
                    <img v-bind:src="'data:image/jpg;base64,'+ user.profilePicture" class="imageDialog profile profileImage"/>
                    
                <v-file-input accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" class="btn" hide-input v-if="$store.state.editState == true" v-model="file">
                    <v-icon>mdi-camera</v-icon>
                </v-file-input>
                </div>
                <div style="margin-left: 8%; width: 40%; border-left: 1px solid #ffffff; padding: 10px;">
                    <h5>
                    <span class="profileIndex">Username:</span> {{user.userName}} <br>
                    <span class="profileIndex">First name:</span> {{user.firstName}} <br>
                    <span class="profileIndex">Last name:</span> {{user.lastName}} <br>

                    
                    <span class="profileIndex">Email: </span>
                        <span v-if="$store.state.editState == false">{{user.email}}</span>
                        <span v-if="$store.state.editState == true">
                            <v-text-field style="margin-top: 0px;" required placeholder="Email" v-model="email"></v-text-field>
                        </span> <br>


                    <span class="profileIndex">Birthday:</span> 
                    <span v-if="$store.state.editState == false">{{user.birthDay}}</span>
                    <span v-if="$store.state.editState == true">
                        
                        <v-text-field required type="date" v-model="birthDay"></v-text-field>
                    </span>
                    </h5>
                </div>
                <div style="border-left: 1px solid #ffffff; padding: 10px;">
                    <span class="profileIndex">Description:</span> 
                    <span v-if="$store.state.editState == false">{{user.profileDescription}}</span>
                    <span v-if="$store.state.editState == true">
                        <v-textarea width="100%" v-model="profileDescription"></v-textarea>
                    </span>
                    <button class="submit" v-on:click="edit()" v-if="$store.state.editState == true">Save</button>
                    
                </div>
            </h2>
        </div>

    </div>
</template>


<script>
export default {
    name: 'profile',
    props: [
        'user'
    ],
    data(){
        return{
            file: [],
            userName: '',
            email: '',
            birthDay: '',
            profileDescription: '',
            valueOfInputState: 0,
            axios: require('axios').default
        }
    },
    methods: {
        edit: function(){
            this.$store.dispatch('updateeditState', false);
            this.valueOfInputState = 0;
        },
        putDataToInputs: function(){
            this.valueOfInputState = 1;
            this.userName = this.user.userName;
            this.email = this.user.email;
            this.birthDay = this.user.birthDay;
            this.profileDescription = this.user.profileDescription;
        }
    }
}
</script>

<style>
    .profileIndex{
        color: #009688;
        text-shadow: 0px 0px 10px #000000;
    }
    .conta{
        position: relative;
    }
    .profileImage{
        box-shadow: 0px 0px 25px #ffffff;
        border: 1px solid #ffffff;
    }
    .conta .btn{
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
    }
    .submit{
      background-color: #757575;
      padding: 7px;
      font-weight: 700;
      border-radius:5px;
      padding-left: 15px;
      padding-right: 17px;
      box-shadow: 0px 1px 1px #000000;
      font-family: Arial, Helvetica, sans-serif;
      transition: 0.5s;
    }

    .submit:hover{
      background-color: #858585;
      transition: 0.5s;
    }

    .submit:active{
      background-color: #858585;
      transition: 0.2s;
    }
</style>