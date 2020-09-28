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
                <div style="margin-left: 8%; width: 30%; border-left: 1px solid #ffffff; padding: 10px;">
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
                <div style="border-left: 1px solid #ffffff; padding: 10px; width: 40%;">
                    <span class="profileIndex">Description: </span> 
                    <span v-if="$store.state.editState == false">{{user.profileDescription}}</span>
                    <span v-if="$store.state.editState == true">
                        <v-textarea width="100%" v-model="profileDescription"></v-textarea>
                    </span>
                    <button class="submit" v-on:click="editProfile()" v-if="$store.state.editState == true">Save</button>
                    
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
            email: '',
            birthDay: '',
            profileDescription: '',
            valueOfInputState: 0,
            axios: require('axios').default
        }
    },
    methods: {
        putDataToInputs: function(){
            this.valueOfInputState = 1;
            this.email = this.user.email;
            this.birthDay = this.user.birthDay;
            this.profileDescription = this.user.profileDescription;
        },
        
        editProfile () {
            this.$store.dispatch('updateeditState', false);
            this.valueOfInputState = 0;
            var formData = new FormData();
            formData.append("file", this.file);

            this.axios({
              method: 'post',
              url: 'http://' + this.$store.state.server + ':3000/user/editProfile',
              headers:{
                'authorization': this.$store.state.token
              },
              data: formData,
              params: {
                'userName': this.userName,
                'email': this.email,
                'birthDay': this.birthDay,
                'profileDescription': this.profileDescription
              }
            }).then((res) => {
                this.validReturn = res.data.text;
                this.errorReturn = null;

                this.$store.dispatch("addToken", res.data.token);
                this.$store.dispatch('updateRefreshPage', 'home');
                this.$store.dispatch('goToPage', 'refresh');
            }).catch((error)=>{
              this.errorReturn = error.response.message;
              console.log(error.response.status + ': ' + error.response.message) 
              this.validReturn = null;
              
              this.$store.dispatch("addToken", 'undefined');
              this.$forceUpdate();
            });

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