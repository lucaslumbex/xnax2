<template>
    <section class="xnax-login">
        <div class="login-rubies">
            <p class="login-intro">Login to your Rubies account</p>
            <div class="login-form">
                <img src="@/assets/img/logo/logo.png" alt="">
                <form @submit.prevent="setUsername">
                    <div class="row">
                        <div class="col-md-12 form-group mb-1">
                            <label for="username" class="form-label">Username</label>
                            <input
                                    type="text" class="form-input form-control" id="username" name="username"
                                    placeholder="Username" v-model="username" v-validate="'required|alpha_num'" data-vv-name="username"
                                    :class="{'is-danger': errors.has('username') }" required
                            >
                            <span v-show="errors.has('username')" class="error-span is-danger">{{ errors.first('username') }}</span>
                        </div>

                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary btn-xnax-login ">Continue</button>
                        </div>

                        <div class="alter-links">
                            <!--<a href="#">Forgot Password?</a>-->
                            <a @click="updateCurrentComponent('enroll')" class="mb-2">Create Account</a>
                            <a href="#">Forgot Password?</a>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Login",
        components: {},
        data () {
            return {
                username: '',
            }
        },
        computed: {
            ...mapGetters([
                'getAppLoading',
            ])
        },
        created () {},
        methods: {
            ...mapActions([
                'updateCurrentComponent',
                'updateUsername',
            ]),
            setUsername(){
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    console.log('validator all check');

                    this.updateUsername(this.username);

                    this.updateCurrentComponent('pin')
                }

            },
        },
    }
</script>
<style scoped>

</style>