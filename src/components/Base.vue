<template>
    <section>
        <div v-if="getAppLoading">
            <div class="page-loading">
                <div class="lds-css ng-scope">
                    <div style="width:100%;height:100%" class="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>

        <component :is="getCurrentComponent"></component>
    </section>
</template>
<script>
    import Login from '@/components/auth/Login'
    import Pin from '@/components/auth/Pin'

    import Enroll from '@/components/auth/Enroll'

    import Dashboard from '@/components/Dashboard'

    import {mapGetters} from 'vuex'

    export default {
        name: "Base",
        components: {
            login: Login,
            pin: Pin,

            enroll: Enroll,

            dashboard: Dashboard,
        },
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'getCurrentComponent',
                'getAppLoading'
            ])
        },
        created () {},
        methods: {},
    }
</script>
<style scoped>
.page-loading{
    position: absolute;
    background: rgba(255, 255, 255, .8);
    width: 100%;
    height: 100%;
    z-index: 99999;
    left: 0;
    top: 0;
    transition: all 2s ease-in-out;
}
@keyframes lds-ripple {
    0% {
        top: 90px;
        left: 90px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 15px;
        left: 15px;
        width: 150px;
        height: 150px;
        opacity: 0;
    }
}
@-webkit-keyframes lds-ripple {
    0% {
        top: 90px;
        left: 90px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 15px;
        left: 15px;
        width: 150px;
        height: 150px;
        opacity: 0;
    }
}
.lds-ripple {
    position: relative;
    margin: 40vh auto;
    transition: all 2s ease-in-out;
}
.lds-ripple div {
    box-sizing: content-box;
    position: absolute;
    border-width: 10px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    -webkit-animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(1) {
    border-color: #6d0606;
}
.lds-ripple div:nth-child(2) {
    border-color: #7b1e1e;
    -webkit-animation-delay: -0.75s;
    animation-delay: -0.75s;
}
.lds-ripple {
    width: 200px !important;
    height: 200px !important;
    -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}

</style>