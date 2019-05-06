<template>
    <section class="xnax-login">
        <div class="login-rubies">
            <p class="login-intro">Login to your Rubies account</p>
            <div class="login-form">
                <img src="@/assets/img/logo/logo.png" alt="">
                <form>
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
                        <div class="col-md-12 form-group mb-3">
                            <label for="pin" class="form-label">Password</label>
                            <input
                                    type="password" class="form-input form-control" id="pin"
                                    placeholder="Password" :class="{pinMode:pinMode}" v-model="pin"
                                    v-validate="'required'" @click.prevent="preDef" v-on:keyup="preDef"
                                    v-on:keypress="preDef" @focus="preDef" v-on:contextmenu="preDef"
                                    @blur="preDef" v-on:paste="preDef" v-on:copy="preDef" v-on:cut="preDef"
                                    autocomplete="off" v-on:keyup.delete="preDef" v-on:keypress.delete="preDef"
                                    data-vv-name="PIN" required maxlength="6" size="6">
                        </div>

                        <div class="num-pad">
                            <div class="key-pad">
                                <div class="key-row">
                                    <div class="key-stroke" @click="inputNo(1)">1</div>
                                    <div class="key-stroke" @click="inputNo(2)">2</div>
                                    <div class="key-stroke" @click="inputNo(3)">3</div>
                                </div>

                                <div class="key-row">
                                    <div class="key-stroke" @click="inputNo(4)">4</div>
                                    <div class="key-stroke" @click="inputNo(5)">5</div>
                                    <div class="key-stroke" @click="inputNo(6)">6</div>
                                </div>

                                <div class="key-row">
                                    <div class="key-stroke" @click="inputNo(7)">7</div>
                                    <div class="key-stroke" @click="inputNo(8)">8</div>
                                    <div class="key-stroke" @click="inputNo(9)">9</div>
                                </div>

                                <div class="key-row">
                                    <div class="key-stroke" @click="clear()">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.4 487.4">
                                            <path d="M438.7 179.1c-3.8 3.6-7.5 7.2-11.1 10.9 -6.2-33.6-19.8-65.6-44.5-94.3 -66.7-77.4-187.1-108.5-275-49.5C30.2 98.6-12.7 197.8 3.4 288.9 21.2 390.4 104.4 484.2 220.3 470.5c63.1-7.4 119.9-38.6 159.6-83.7 0.8-0.7 1.5-1.5 2.3-2.3 0.9-1 1.7-2 2.4-3.1 1.6-2.5 2.8-5.3 3.4-8.3l0.5-2.5c2.7-13.8-7.2-27.7-21.7-30.5 -8.5-1.6-16.9 0.9-23 6.1 -2.4 2-4.4 4.5-5.9 7.3 -0.3 0.6-0.8 1.2-1 1.9 -0.1-0.1-0.3-0.1-0.4-0.2 -39.2 45-98.6 74.4-160.2 63C74.4 399.2 38 282.1 62.2 197.4 83.2 124.3 152.9 50.5 240.3 68.8c52.1 11 105.6 47.6 125.1 96.5 2 5.1 3.8 10.2 5.3 15.4 -7.1-5.9-14.6-11.5-22.4-16.7 -12.3-8-27.7-9.4-38.2 2.1 -8.7 9.5-9.4 28.5 2.9 36.5 16.4 10.8 30.7 23.1 43.2 37 7.5 8.4 14.4 17.5 20.5 27.2 1.3 2.1 2.7 4.3 4 6.5 6.2 10.7 16.1 13.6 25.2 11.7 7.4-0.1 14.6-2.7 18.9-8.5 3-4 6-7.9 9-11.8 3.3-4.3 6.7-8.5 10.1-12.6 11.1-13.5 22.9-26.5 35.8-38.6C504.5 190.4 463.3 156.1 438.7 179.1z"></path>
                                        </svg>
                                    </div>
                                    <div class="key-stroke" @click="inputNo(0)">0</div>
                                    <div class="key-stroke" @click="backspace()">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M490.7 64H133.1c-7.2 0-13.9 3.6-17.8 9.6L3.5 244.3c-4.6 7.1-4.6 16.3 0 23.4l111.7 170.7c3.9 6 10.7 9.6 17.8 9.6h357.6c11.8 0 21.3-9.6 21.3-21.3V85.3C512 73.6 502.4 64 490.7 64zM469.3 405.3H144.6L46.8 256l97.8-149.3h324.7V405.3z"></path>
                                            <path d="M198.2 356.4c8.3 8.3 21.8 8.3 30.2 0l70.2-70.2 70.2 70.2c8.3 8.3 21.8 8.3 30.2 0s8.3-21.8 0-30.2L328.8 256l70.2-70.2c8.3-8.3 8.3-21.8 0-30.2s-21.8-8.3-30.2 0l-70.2 70.2 -70.2-70.2c-8.3-8.3-21.8-8.3-30.2 0 -8.3 8.3-8.3 21.8 0 30.2L268.5 256l-70.2 70.2C189.9 334.6 189.9 348.1 198.2 356.4z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="side-action">
                                <a @click="updateCurrentComponent('forgotpin')"> Forgot PIN?</a>
                                <br>
                                <a @click="updateCurrentComponent('login')"> &lt; Back</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Pin",
        components: {
            // UiAlert,
        },
        data () {
            return {
                pin: '',
                pinMode: false,

                alert: {
                  show: false,
                  type: 'error',
                  message: 'Something Went Wrong!'
                },
            }
        },
        computed: {
            ...mapGetters([
                'getUsername',
                'startAppLoading',
                'stopAppLoading',
            ])
        },
        created () {},
        methods: {
            ...mapActions([
                'updateCurrentComponent',
                'updateDataOnLogin',
            ]),


            showAlert(show, type, message){
                this.alert.show = show;
                this.alert.type = type;
                this.alert.message = message;
            },
            saveToLocalStorage(data){
                localStorage.c5b3e72c_08e8_4667_82366_b48acb3dc6e = data;
            },

            preDef(e){
                e.preventDefault();
                $(this).blur();
                this.pinModeCheck();
                return false;
            },
            inputNo(no) {
                if(this.pin.length < 6){
                    //input the pin and check if the input is in pin mode
                    this.pin = this.pin + no;
                    this.pinModeCheck();

                    // Check if its time to post yet
                    if (this.pin.length === 6){
                        // //set app loading to true
                        // this.startAppLoading;
                        //consume "login" API
                        this.appLogin();
                    }
                }else {
                    //pin is more than 6 digits -- show error alert
                    this.showAlert(true, 'error', 'PIN Can Only Be 6 Digits')
                }
            },
            backspace() {
                this.pin = this.pin.slice(0, -1);
                this.pinModeCheck();
            },
            clear() {
                this.pin = '';
                this.pinArr = [];
                this.pinModeCheck();
            },
            pinModeCheck () {
                this.pinMode = this.pin.length >= 1 ;
            },

            appLogin () {
                //startAppLoading
                this.startAppLoading

                let username = this.getUsername;

                console.log('username ==>>', username);

                //Consume Login API
                axios({
                    method:'post',
                    url:'/logincustomer',
                    headers:{'Authorization': null},
                    data:{
                        username: this.getUsername,
                        password: this.pin,
                        appversion: "1.0",
                        deviceplatform: "web",
                        mobiledeviceid: "232323141212",
                        source: "Web"
                    }
                }).then(response => {
                    //stopAppLoading
                    this.stopAppLoading

                    console.log('response ==>>', response);


                    //retrieve login Data
                    let responseData = response.data;

                    if (responseData.responsecode === '00'){
                        console.table(responseData);

                        //set dataOnLogin in the store to the login response
                        this.updateDataOnLogin(responseData);

                        // change the currentComponent in the store to 'dashboard'
                        this.updateCurrentComponent('dashboard')
                    }else {
                        //reset pin input
                        this.pin = '';
                        this.pinModeCheck();

                        // display error notification
                        this.showAlert(true, 'error', responseData.responsemessage)
                    }
                }).catch(error => {
                    //reset pin input
                    this.pin = '';
                    this.pinModeCheck();

                    // display error notification
                    this.showAlert(true, 'error', 'Unexpected Error Occurred!')
                })
            },

            forgotpassword(){
                console.log('Switch to Forgot Password Page')
            },
            login1(){
                this.pin = '';

                //Route to Login page
                this.$router.push('/');
            },
        },
        mounted(){
            this.$nextTick(()=>{
                let passwordBox = $('#pin');
                passwordBox.bind('click keypress copy paste cut contextmenu focus', function(e) {
                    e.preventDefault();
                    $(this).blur();
                    return false;
                });
            });
        }
    }
</script>
<style scoped>
.ui-alert {
    font-family: Nunito;
    font-size: 12px;
}
.alert-box{
    margin-top: -10px;
}
.pinMode{
    font-size: 32px !important;
    letter-spacing: 5px;
    -webkit-transition: none !important;
    transition: none !important;
    padding: 0 5px 5px 10px;
    line-height: 10px;
    height: 32px;
}
</style>