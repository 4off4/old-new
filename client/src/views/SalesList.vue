<template>
    <main class="mt-3">
        <div class="container">
            <div class="float-end mb-3">
                <button type="button" class="btn btn-dark" @click="goToInsert">upload</button>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Shipping Charge</th>
                        <th>Additional Shipping Charge</th>
                        <th>img manage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="i" v-for="(product, i) in productList">
                        <td>
                        <img v-if="product.path!=null" :src="`/download/${product.id}/${product.path}/0`" style="height:50px;width:auto;" />
                        </td>
                        <td>{{product.product_name}}</td>
                        <td>{{product.product_price}}</td>
                        <td>{{product.delivery_price}}</td>
                        <td>{{product.add_delivery}}</td>
                        
                        <td>
                            <button type="button" class="btn btn-info me-1" @click="goToImageInsert(product.id);">img save</button>
                            <button type="button" class="btn btn-warning me-1" @click="goToUpdate(product.id);">update</button>
                            <button type="button" class="btn btn-danger" @click="deleteProduct(product.id);">delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<script>
export default {
    data(){
        return {
          productList: []  
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        async getProductList() {
           this.productList = await this.$api("/api/productList2",{});
           console.log(this.productList);
        },
        goToInsert() {
            this.$router.push({path:'/create'});
        },
        goToUpdate(id) {
            this.$router.push({path:'/update', query:{id:id}});
        },
        goToDetail(id) {
            this.$router.push({path:'/detail', query:{id:id}});
        },
        goToImageInsert(id) {
            this.$router.push({path:'/image_insert', query:{id:id}});
        },
        deleteProduct(id) {
            this.$swal.fire({
                title: 'Do you want to Delete the product?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: `Cancel`,
                }).then(async(result) => {
                if (result.isConfirmed) {
                    console.log(id);
                    await this.$api("/api/productDelete",{param:[id]});
                    this.getProductList();
                    this.$swal.fire('Delete!', '', 'success')
                }
            });
        }
    }
}
</script>