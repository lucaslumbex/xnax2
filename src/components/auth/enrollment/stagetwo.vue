<template>
    <section class="xnax-login">
        <div class="login-rubies">
<!--            <p class="login-intro">Enrollment</p>-->
            <p class="login-intro">Introduce Yourself Please</p>
            <div class="login-form">
                <img src="@/assets/img/logo/logo.png" alt="">
                <form @submit.prevent="validateUsername">
                    <div v-if="alert.show" class="alert-box">
                        <div class="row">
                            <div class="col-sm-12">
                                <ui-alert @dismiss="alert.show = false" :type="alert.type" v-show="alert.show">
                                    {{alert.message}}
                                </ui-alert>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 form-group mb-2">
                            <label for="username" class="form-label">Username</label>
                            <input
                                    type="text" class="form-input form-control" id="username" name="username"
                                    placeholder="Username" v-model="username" v-validate="'required|min:1|alpha_num'" data-vv-name="username"
                                    :class="{'is-danger': errors.has('username') }" required
                            >
                            <span v-show="errors.has('username')" class="error-span is-danger">{{ errors.first('username') }}</span>
                        </div>

                        <div class="col-md-12 form-group mb-2">
                            <label for="firstname" class="form-label">Firstname</label>
                            <input
                                    type="text" class="form-input form-control" id="firstname" name="firstname"
                                    placeholder="Firstname" v-model="firstname" v-validate="'required|min:1|alpha_spaces'" data-vv-name="firstname"
                                    :class="{'is-danger': errors.has('firstname') }" required
                            >
                            <span v-show="errors.has('firstname')" class="error-span is-danger">{{ errors.first('firstname') }}</span>
                        </div>

                        <div class="col-md-12 form-group mb-3">
                            <label for="lastname" class="form-label">Lastname</label>
                            <input
                                    type="text" class="form-input form-control" id="lastname" name="lastname"
                                    placeholder="Lastname" v-model="lastname" v-validate="'required|min:1|alpha_spaces'" data-vv-name="lastname"
                                    :class="{'is-danger': errors.has('lastname') }" required
                            >
                            <span v-show="errors.has('lastname')" class="error-span is-danger">{{ errors.first('lastname') }}</span>
                        </div>

                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary btn-xnax-login ">Proceed</button>
                        </div>

                        <div class="alter-links">
                            <!--<a href="#">Forgot Password?</a>-->
                            <a @click="updateEnrollComponent('stageone')" class="mb-2">< Back</a>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import VueTelInput from 'vue-tel-input';

    import {enrollmentEventBus} from "../../../main";


    export default {
        name: "stagetwo",
        components: {
            VueTelInput,
        },
        props: {
            totalRequestBody: {
                type: Object,
                default: {}
            },
        },
        data () {
            return {
                username: '',
                firstname: '',
                lastname: '',

                mutableTotalRequestBody: this.totalRequestBody,

                alert: {
                    show: false,
                    type: 'error',
                    message: 'Something Went Wrong!'
                },
            }
        },
        computed: {
            ...mapGetters([
                'getAppLoading',
                'startAppLoading',
                'stopAppLoading',
            ])
        },
        created () {},
        methods: {
            ...mapActions([
                'updateCurrentComponent',
                'updateEnrollComponent',
                'updateAppLoading',
            ]),

            showAlert(show, type, message){
                this.alert.show = show;
                this.alert.type = type;
                this.alert.message = message;
            },
            validateUsername () {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    this.updateAppLoading(true)

                    //  Make API call
                    axios
                        .post('/checkusername', {
                            username: this.username,
                        })
                        .then(response => {
                            if (response.data.responsecode === '02'){
                                this.mutableTotalRequestBody.username = this.username;
                                this.mutableTotalRequestBody.firstname = this.firstname;
                                this.mutableTotalRequestBody.lastname = this.lastname;

                                axios
                                    .post('/enrolmentinitiate', {
                                        email: this.mutableTotalRequestBody.email,
                                        countrycode: this.mutableTotalRequestBody.countrycode,
                                        phonenumber: this.mutableTotalRequestBody.phonenumber,

                                        firstname: this.mutableTotalRequestBody.firstname,
                                        username: this.mutableTotalRequestBody.username,
                                        lastname : this.mutableTotalRequestBody.lastname,

                                        source:"web"
                                    })
                                    .then(response => {
                                        this.updateAppLoading(false)

                                        if (response.data.responsecode === '00'){
                                            let responseData = response.data;

                                            this.mutableTotalRequestBody.uniqueref = responseData.uniqueref;

                                            enrollmentEventBus.$emit('totalRequestBodyUpdated', this.mutableTotalRequestBody)

                                            //reset Notification
                                            this.alert.show = false;

                                            //    switch pages/stages
                                            this.updateEnrollComponent('stagethree')
                                        }else {
                                            // display error notification
                                            this.showAlert(true, 'error', response.data.responsemessage)
                                        }
                                    })
                                    .catch(error => {
                                        //stop running
                                        this.updateAppLoading(false)

                                        this.showAlert(true, 'error', 'Network Error')
                                    })
                            }else {
                                //reset step 1 fields & stop app Loading
                                this.updateAppLoading(false);

                                // display error notification
                                this.showAlert(true, 'error', 'Username already in use')
                            }
                        })
                        .catch(error => {
                            //stop running
                            this.updateAppLoading(false)

                            this.showAlert(true, 'error', 'Network error please try again!')
                        })
                }
            },
        },
    }
</script>

<style scoped>

</style>