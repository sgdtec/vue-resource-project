<template>
    <div>
         <form class="form form-inline" @submit.prevent="search()">
             <input type="text" v-model="filter" placeholder="procurar?" class="form-control">
             <button class="btn-default">Pesquizar</button>
         </form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            filter: ''
        }
    },
    methods: {
        search () {
            this.$emit('search', this.filter)
        }
    }
}
</script>

<style scoped>

</style>
