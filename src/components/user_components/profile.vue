<template>
    <div>
        <div>
            <h2 style="display: inline-flex; width: 100%;">
                <img v-bind:src="'data:image/jpg;base64,'+ user.profilePicture" class="imageDialog profile profileImage"/>
                <div style="margin-left: 8%; width: 40%; border-left: 1px solid #ffffff; padding: 10px;">
                    <h5>
                    <span class="profileIndex">Username:</span> {{user.userName}} <br>
                    <span class="profileIndex">First name:</span> {{user.firstName}} <br>
                    <span class="profileIndex">Last name:</span> {{user.lastName}} <br>
                    <span class="profileIndex">Email:</span> {{user.email}} <br>
                    <span class="profileIndex">Birthday:</span> {{user.birthDay}}
                    </h5>
                </div>
                <div style="border-left: 1px solid #ffffff; padding: 10px;">
                    <span class="profileIndex">Description:</span> {{user.profileDescription}}
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
            axios: require('axios').default
        }
    },
    methods: {
    }
}
</script>

<style>
    .profileIndex{
        color: #BBDEFB;
        text-shadow: 0px 0px 10px #000000;
    }
    .profileImage{
        box-shadow: 0px 0px 100px #ffffff;
        border: 1px solid #ffffff;
    }
</style>