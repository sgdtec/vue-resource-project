<template>
    <div>
        <h1 v-text="title"></h1>
       
        <form @submit.prevent="createProduct()">
            <div class="form-group" :class="{'has-warning' : errorsValidation.name}">
                
                <input type="text" v-model="product.category_id" class="form-control">
                <div v-if="errorsValidation.category_id">
                    <p v-for="(error, index) in errorsValidation.category_id" :key="index" v-text="error"></p>
                </div>

                <input type="text" class="form-control" v-model="product.name" placeholder="name">
                <div v-if="errorsValidation.name" :class="{'has-warning' : errorsValidation.name}" >
                    <p v-for="(error, index) in errorsValidation.name" :key="index" v-text="error"></p>
                </div>

            </div>

            <div class="form-group">
                <input type="text" class="form-control" v-model="product.description" placeholder="Description">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </form>
        <preloader-component :preloader="preloader"></preloader-component>
    </div>
</template>

<script>
import PreloaderComponent from '../general/PreloaderComponent'

export default {
    data () {
        return {
            title: 'Add New Product',
            product: {
                category_id: '',
                name: '',
                description: '',                
            },
            errorsValidation: '',
            preloader: false,
        }
    },
    methods : {
        createProduct() {
            this.preloader = true
            this.$http.post('http://localhost:8000/api/v1/products', this.product)
                .then(response => {
                   console.log(response)
                   this.$router.push('/product')
                }, error => {
                    if(error.status === 422) {
                        this.errorsValidation = error.body.errors
                    }
                    console.log(error)
                }).finally(() => this.preloader = false)
        }
    },
    components: {
        PreloaderComponent
    }
}
</script>

<style scoped>
.has-warning {color: rgb(168, 25, 25);}
.has-warning input {border: 1px solid rgb(168, 25, 25);}
</style>