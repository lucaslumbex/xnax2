<template>
    <component :is="getEnrollComponent" :totalRequestBody="totalRequestBody"></component>
</template>

<script>
    import Stageone from '@/components/auth/enrollment/stageone'
    import Stagetwo from '@/components/auth/enrollment/stagetwo'
    import Stagethree from '@/components/auth/enrollment/stagethree'


    import {mapGetters} from 'vuex'

    export default {
        name: "Enroll",
        components: {
            stageone: Stageone,
            stagetwo: Stagetwo,
            stagethree: Stagethree,
        },
        data () {
            return {
                totalRequestBody: {},
            }
        },
        computed: {
            ...mapGetters([
                'getEnrollComponent',
                'getAppLoading'
            ])
        },
        created () {},
        methods: {},
    }
</script>

<style scoped>

</style>