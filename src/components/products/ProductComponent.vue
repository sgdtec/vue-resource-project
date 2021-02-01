<template>
    <div>
      <h1>{{title}}</h1>  
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: 'Lista de Produtos'
        }
    },
    created () {
        this.getProducts()
    },
    methods: {
        getProducts () {         
            this.$http.get('http://localhost:8000/api/v1/products')
                .then(response => {
                    console.log(response)
                }, error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>

</style>