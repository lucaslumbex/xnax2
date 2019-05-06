<template>
    <section>
        <p>{{getDataOnLogin}}</p>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Dashboard",
        components: {},
        data () {
            return {
                alert: {
                    show: true,
                    type: 'success',
                    message: 'Invalid Credentials'
                },
            }
        },
        computed: {
            ...mapGetters([
                'getUsername',
                'startAppLoading',
                'stopAppLoading',
                'getDataOnLogin',
            ])
        },
        created () {},
        methods: {
            ...mapActions([
                'updateCurrentComponent',
                'updateDataOnLogin',
            ]),

        },
    }
</script>

<style scoped>

</style>