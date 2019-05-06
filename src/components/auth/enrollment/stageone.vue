<template>
    <section class="xnax-login">
        <div class="login-rubies">
            <p class="login-intro">Enrollment</p>
            <p class="login-intro">--{{getAppLoading}}--</p>
            <div class="login-form">
                <img src="@/assets/img/logo/logo.png" alt="">
                <form @submit.prevent="validatePhoneNumberEmail">
                    <div class="alert-box">
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
                            <label for="form-input-phone-no" class="form-label">Phone Number </label>
                            <vue-tel-input
                                    @onInput="onInput" id="form-input-phone-no" class="form-input-phone-no"
                                    v-model="phone.number" v-bind="bindProps"
                            ></vue-tel-input>
                        </div>
                        <div class="col-md-12 form-group mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input
                                    type="text" class="form-input form-control" id="email" name="email"
                                    placeholder="Email" v-model="email" v-validate="'required|email'" data-vv-name="Email"
                                    :class="{'is-danger': errors.has('email') }" required key="email-input"
                            >
                            <span v-show="errors.has('email')" class="error-span is-danger">{{ errors.first('email') }}</span>
                        </div>

                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary btn-xnax-login ">Proceed</button>
                        </div>

                        <div class="alter-links">
                            <!--<a href="#">Forgot Password?</a>-->
                            <a @click="updateCurrentComponent('login')" class="mb-2">< Login</a>
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
        name: "stageone",
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
                email: '',
                phone: {
                    number: '',
                    isValid: false,
                    country: undefined,
                },
                bindProps: {
                    placeholder: 'Phone Number',
                    required: true,
                    disabledFetchingCountry: true,
                    defaultCountry: 'NG',
                    preferredCountries: ['NG', 'GB', 'US', 'CA'],
                    disabledFormatting: true,
                },

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
            onInput({ number, isValid, country }) {
                this.phone.number = number;
                this.phone.isValid = isValid;
                this.phone.country = country && country.dialCode;
            },
            validatePhoneNumberEmail () {
                this.$validator.validateAll();
                if (!this.errors.any() && this.phone.isValid) {
                    //Start App Loading
                    this.updateAppLoading(true)

                    //  Make API call
                    axios
                        .post('/validateemailphonumber', {
                            email:this.email,
                            phonenumber: this.phone.number,
                            countrycode: this.phone.country,
                        })
                        .then(response => {
                            //Stop app loading
                            this.updateAppLoading(false)

                            let responseData = response.data

                            if (responseData.responsecode === '00'){
                                // Update the Total Request Body
                                this.mutableTotalRequestBody.countrycode = responseData.countrycode;
                                this.mutableTotalRequestBody.phonenumber = responseData.phonenumber;
                                this.mutableTotalRequestBody.email = responseData.email;

                                console.log(this.mutableTotalRequestBody);

                                //Update the total request body
                                enrollmentEventBus.$emit('totalRequestBodyUpdated', this.mutableTotalRequestBody);

                                console.log('Current Total Body Request (P1) ===>>>',this.mutableTotalRequestBody);


                                //reset Notification
                                this.alert.show = false;

                                //    switch pages/stages
                                this.updateEnrollComponent('stagetwo')
                            }
                            else {
                                // display error notification
                                this.showAlert(true, 'error', response.data.responsemessage)
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