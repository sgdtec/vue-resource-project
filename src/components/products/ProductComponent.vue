<template>
    <div>
      <h1>{{title}}</h1>

      <router-link to="product/create" class="btn btn-primary">Add Product</router-link>
      
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
                      <a href="#" class="btn btn-info btn-sm">Editar</a>
                      <a href="#" class="btn btn-danger btn-sm">Editar</a>
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
        }
    },
    created () {
        this.getProducts()
	},
    methods: {
        getProducts () {
			this.preloader = true
			
			this.$http.get(`http://localhost:8000/api/v1/products?page=${this.products.current_page}`)
				.then(response => {
					console.log(response)
					this.products = response.data
				}, error => {
					console.log(error)
				})
				.finally(() => this.preloader = false)
        },
        insertProduct() {
            alert('Here')
        }
    },
	components: {
		PaginationComponent,
		PreloaderComponent,
	}
}
</script>

<style scope>

</style>