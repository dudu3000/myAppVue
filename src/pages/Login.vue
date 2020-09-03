<template>
    <div id="app">
        <main>
            <v-container>
                <v-col cols="12">
                    <v-row>
                        <v-card
                            width="100%"
                            class="ma-3 pa-6 red accent-2"
                            dark
                            outlined
                            centered
                            justify="center"
                        >
                            <h1>Login</h1>

                            <v-alert type="success" v-if="validReturn !== null">{{validReturn}}</v-alert>

                            <v-alert
                                color="#C51162"
                                dark
                                icon="mdi-material-design"
                                border="right"
                                v-if="errorReturn !== null"
                            >{{errorReturn}}</v-alert>

                            <v-text-field label="Username" required placeholder="Username" v-model="username"></v-text-field>
                            <v-text-field
                                label="Password"
                                required
                                placeholder="Password"
                                type="password"
                                v-model="password"
                            ></v-text-field>

                            <v-btn rounded color="yellow darken-4" dark v-on:click="login()">Login</v-btn>
                        </v-card>
                    </v-row>
                </v-col>
            </v-container>
        </main>
    </div>
</template>




<script>
export default {
    name: "login",
    data() {
        return {
            validReturn: null,
            errorReturn: null,
            username: null,
            password: null,
            token: "undefined",
            axios: require("axios").default
        };
    },
    methods: {
        login() {
            this.axios.post('http://' + this.$store.state.server + ':3000/user/login', {
                userName: this.username,
                password: this.password,
                minutes: 10
            }).then(response => {
                this.validReturn = response.data.text;
                this.errorReturn = null;
                this.$store.dispatch("addToken", response.data.token);
                this.token = response.data.token;
                this.$store.dispatch("goToPage", "home");
            },error => {
                this.errorReturn ="Failed to login. Incorrect username or password!";
                console.log(error);
                this.validReturn = null;
            });
        }
    } 
};
</script>




<style>
.container {
    padding: 20px;
}
</style>