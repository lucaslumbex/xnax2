<template>
    <section class="xnax-login">
        <div class="login-rubies">
<!--            <p class="login-intro">Enrollment</p>-->
            <p class="login-intro">{{tPinMessage}}</p>
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
                        <div class="col-sm-12">
                            <div v-if="confirmTransactionPin">
                                <!--input confirmpasscode-->
                                <div class="setPinBox">
                                    <div class="pinHolder">
                                        <span class="pinIndex" :class="{'active': confirmpasscode.length > 0}"></span>
                                        <span class="pinIndex" :class="{'active': confirmpasscode.length > 1}"></span>
                                        <span class="pinIndex" :class="{'active': confirmpasscode.length > 2}"></span>
                                        <span class="pinIndex" :class="{'active': confirmpasscode.length > 3}"></span>
                                        <span class="pinIndex" :class="{'active': confirmpasscode.length > 4}"></span>
                                        <span class="pinIndex" :class="{'active': confirmpasscode.length > 5}"></span>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <!--input passcode-->
                                <div class="setPinBox">
                                    <div class="pinHolder">
                                        <span class="pinIndex" :class="{'active': passcode.length > 0}"></span>
                                        <span class="pinIndex" :class="{'active': passcode.length > 1}"></span>
                                        <span class="pinIndex" :class="{'active': passcode.length > 2}"></span>
                                        <span class="pinIndex" :class="{'active': passcode.length > 3}"></span>
                                        <span class="pinIndex" :class="{'active': passcode.length > 4}"></span>
                                        <span class="pinIndex" :class="{'active': passcode.length > 5}"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="num-pad alt">
                                <div class="key-pad">
                                    <div class="key-row">
                                        <div class="key-stroke" @click="tPinInputNo(1)">1</div>
                                        <div class="key-stroke" @click="tPinInputNo(2)">2</div>
                                        <div class="key-stroke" @click="tPinInputNo(3)">3</div>
                                    </div>

                                    <div class="key-row">
                                        <div class="key-stroke" @click="tPinInputNo(4)">4</div>
                                        <div class="key-stroke" @click="tPinInputNo(5)">5</div>
                                        <div class="key-stroke" @click="tPinInputNo(6)">6</div>
                                    </div>

                                    <div class="key-row">
                                        <div class="key-stroke" @click="tPinInputNo(7)">7</div>
                                        <div class="key-stroke" @click="tPinInputNo(8)">8</div>
                                        <div class="key-stroke" @click="tPinInputNo(9)">9</div>
                                    </div>

                                    <div class="key-row">
                                        <div class="key-stroke" @click="clear()">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.4 487.4">
                                                <path d="M438.7 179.1c-3.8 3.6-7.5 7.2-11.1 10.9 -6.2-33.6-19.8-65.6-44.5-94.3 -66.7-77.4-187.1-108.5-275-49.5C30.2 98.6-12.7 197.8 3.4 288.9 21.2 390.4 104.4 484.2 220.3 470.5c63.1-7.4 119.9-38.6 159.6-83.7 0.8-0.7 1.5-1.5 2.3-2.3 0.9-1 1.7-2 2.4-3.1 1.6-2.5 2.8-5.3 3.4-8.3l0.5-2.5c2.7-13.8-7.2-27.7-21.7-30.5 -8.5-1.6-16.9 0.9-23 6.1 -2.4 2-4.4 4.5-5.9 7.3 -0.3 0.6-0.8 1.2-1 1.9 -0.1-0.1-0.3-0.1-0.4-0.2 -39.2 45-98.6 74.4-160.2 63C74.4 399.2 38 282.1 62.2 197.4 83.2 124.3 152.9 50.5 240.3 68.8c52.1 11 105.6 47.6 125.1 96.5 2 5.1 3.8 10.2 5.3 15.4 -7.1-5.9-14.6-11.5-22.4-16.7 -12.3-8-27.7-9.4-38.2 2.1 -8.7 9.5-9.4 28.5 2.9 36.5 16.4 10.8 30.7 23.1 43.2 37 7.5 8.4 14.4 17.5 20.5 27.2 1.3 2.1 2.7 4.3 4 6.5 6.2 10.7 16.1 13.6 25.2 11.7 7.4-0.1 14.6-2.7 18.9-8.5 3-4 6-7.9 9-11.8 3.3-4.3 6.7-8.5 10.1-12.6 11.1-13.5 22.9-26.5 35.8-38.6C504.5 190.4 463.3 156.1 438.7 179.1z"></path>
                                            </svg>
                                        </div>
                                        <div class="key-stroke" @click="tPinInputNo(0)">0</div>
                                        <div class="key-stroke" @click="backspace()">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M490.7 64H133.1c-7.2 0-13.9 3.6-17.8 9.6L3.5 244.3c-4.6 7.1-4.6 16.3 0 23.4l111.7 170.7c3.9 6 10.7 9.6 17.8 9.6h357.6c11.8 0 21.3-9.6 21.3-21.3V85.3C512 73.6 502.4 64 490.7 64zM469.3 405.3H144.6L46.8 256l97.8-149.3h324.7V405.3z"></path>
                                                <path d="M198.2 356.4c8.3 8.3 21.8 8.3 30.2 0l70.2-70.2 70.2 70.2c8.3 8.3 21.8 8.3 30.2 0s8.3-21.8 0-30.2L328.8 256l70.2-70.2c8.3-8.3 8.3-21.8 0-30.2s-21.8-8.3-30.2 0l-70.2 70.2 -70.2-70.2c-8.3-8.3-21.8-8.3-30.2 0 -8.3 8.3-8.3 21.8 0 30.2L268.5 256l-70.2 70.2C189.9 334.6 189.9 348.1 198.2 356.4z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        name: "stagethree",
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
                passcode: '',
                confirmpasscode: '',
                tPinMessage: 'Setup your Password.',
                confirmTransactionPin: false,

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
            resetInputFields(){
                this.passcode = '';
                this.confirmpasscode = '';
            },
            tPinInputNo(no){
                if (this.confirmTransactionPin){
                    //    input The incoming number
                    this.confirmpasscode = this.confirmpasscode + no;
                    //    check if confirm passcode length is up to 4 now
                    this.tPinLengthCheck();
                }
                else {
                    //    input The incoming number
                    this.passcode = this.passcode + no;
                    //    check if passcode length is up to 4 now
                    this.tPinLengthCheck();
                }
            },
            backspace() {
                if(this.confirmTransactionPin){
                    this.confirmpasscode = this.confirmpasscode.slice(0, -1);
                }else {
                    this.passcode = this.passcode.slice(0, -1);
                }
            },
            clear() {
                if(this.confirmTransactionPin){
                    this.confirmpasscode = '';
                }else {
                    this.passcode = '';
                }
            },

            tPinLengthCheck(){
                //reset Notification
                this.alert.show = false;
                if (this.confirmTransactionPin){
                    if (this.confirmpasscode.length === 6){
                        if (this.passcode === this.confirmpasscode){
                            console.log('tPin match');
                            //    consume API or do the next thing
                            this.mutableTotalRequestBody.passcode = this.passcode;

                            console.log('Current Total Body Request (P3) ===>>>',this.mutableTotalRequestBody);

                            enrollmentEventBus.$emit('totalRequestBodyUpdated', this.mutableTotalRequestBody);

                            //    switch pages/stages
                            this.updateEnrollComponent('stagefour')

                        }
                        else{
                            this.resetInputFields();
                            this.confirmTransactionPin  = false;

                            // display error notification
                            this.showAlert(true, 'error', 'Password mismatch. Try again!')
                            this.tPinMessage = 'Setup your Password.'
                        }
                    }
                }
                else {
                    if (this.passcode.length === 6){
                        this.confirmTransactionPin = true;
                        this.tPinMessage = 'Confirm your Password.'
                    }
                }
            },
        },
    }
</script>

<style scoped>
    .num-pad.alt{
        width: auto;
        /* margin: 0 auto; */
        text-align: center;
        display: flex;
    }
    .num-pad.alt .key-pad{
        width: auto;
        margin: 0 auto;
        display: block;
    }
    .num-pad.alt .key-pad .key-row{
        padding-right: 0
    }
    .num-pad.alt .key-pad .key-stroke:last-child{
        margin-right: 0;
    }

</style>