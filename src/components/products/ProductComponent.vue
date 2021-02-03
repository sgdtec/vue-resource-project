<template>
    <div>
      <h1>{{title}}</h1>
        <div class="row">
            <div class="col">
                <router-link to="product/create" class="btn btn-primary">
                Add Product
                </router-link>
            </div>

            <div class="col">
                <product-search-component  @search="searchProduct" />
            </div>  

        </div>        
        
        <div class="alert alert-danger text-center sizeDelete" v-if="confirmDelete">
            <h2>Deseja deletar?</h2>
            <hr>
            <button class="btn btn-danger" @click.prevent="deleteProduct">Deletar Agora</button>
        </div>

        <div>
            <p><strong>Total registros:</strong> {{ products.total }}</p>
        </div>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th class="text-center">#Id</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Image</th>
                    <th class="text-center" width="150">Açoes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products.data" :key="index">
                    <td class="text-center">{{ product.id}}</td>
                    <td>{{ product.name}}</td>
                    <td>{{ product.description}}</td>
                    <td>{{ product.iamge}}</td>
                    <td class="text-center">
                        <router-link class="btn btn-info btn-sm" 
                            :to="{name: 'product.edit', params: {
                                id: product.id
                            }}">
                            Editar
                        </router-link>

                        <a href="#" @click.prevent="confirmDeleteProduct(product.id)" class="btn btn-danger btn-sm">Excluir</a>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <!--  <ul class="pagination">
            <li v-if="products.current_page - 1 >= 1" class="page-item">
                <a href="#" class="page-link" @click.prevent="pagination(products.current_page - 1)">Anterior</a>
            </li>
            <li v-if="products.current_page + 1 < products.last_page" class="page-item">
                <a href="#" class="page-link" @click.prevent="pagination(products.current_page + 1)">Próxima</a>
            </li>
        </ul> -->

        <preloader-component
                :preloader="preloader">
        </preloader-component>

        <pagination-component
            :pagination="products"
            :offset="offset"
            @paginate="getProducts">
        </pagination-component> 
    
    </div>
</template>


<script>
import PaginationComponent from '../general/PaginationComponent'
import PreloaderComponent from '../general/PreloaderComponent'
import ProductSearchComponent from '../products/ProductSearchComponent'


export default {
    data() {
        return {
            title: 'List Products', // title Page
            products: {
                total: 0,
                per_page: 10,
                from: 1,
                to: 0,
                current_page: 1,
                data: []
            },
            offset: 8, // Total Items por page (default)
            preloader: false, // Is Preloader is runing
            confirmDelete: false,
            idProductDelete: 0,
            filter: ''
        }
    },
    created () {
        this.getProducts()
	},
    methods: {
        getProducts () {
			this.preloader = true
			
			this.$http.get(`http://localhost:8000/api/v1/products?page=${this.products.current_page}&filter=${this.filter}`)
				.then(response => {
					console.log(response)
					this.products = response.data
				}, error => {
					console.log(error)
				})
				.finally(() => this.preloader = false)
        },
        confirmDeleteProduct(id) {
            this.confirmDelete = true
            this.idProductDelete = id
        },
        deleteProduct(id) {
            this.preloader = true
            this.$http.delete(`http://localhost:8000/api/v1/products/${this.idProductDelete}`)
                .then(response => {
                    this.clearField()
                    this.getProducts()
                   }, error => {
                        console.log(error)
                   })
                .finally(() => this.preloader - false)
        },
        clearField () {
             this.idProductDelete = 0
             this.confirmDelete = false
        },
        searchProduct (filter) {
            this.filter = filter
            this.getProducts()
        }
    },
	components: {
		PaginationComponent,
        PreloaderComponent,
        ProductSearchComponent
	}
}
</script>

<style scope>
.sizeDelete {
    margin: 0 auto;
    max-width: 300px;
    border: 1px sold #ccc;
    margin-top: 10px;
}
</style>