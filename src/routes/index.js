import HomeComponent from '../components/home/HomeComponent'
import ProductComponent from '../components/products/ProductComponent'
import ProductCreateComponent from '../components/products/ProductCreateComponent'

export default [
    {path: '/', component: HomeComponent},
    {path: '/product', component: ProductComponent},
    {path: '/product/create', component: ProductCreateComponent},
]