<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                    <select class="form-select">
                        <option selected>select</option>
                        <option value="1">Mac</option>
                        <option value="2">Phone</option>
                        <option value="3">Acc</option>
                        </select>
                </div>
            </div>
            <div class="row g-3">
                <!-- 제품1 -->
                <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(product,i) in productList">
                    <div class="card" style="width: 18rem;">
                        <a @click="goToDetail(product.id);" style="cursor:pointer">
                            <img :src="product.path" class="card-img-top" alt="...">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">{{product.product_name}}</h5>
                            <p class="card-text">
                                <span class="badge bg-dark text-white me-1">{{product.category1}}</span>
                                <span class="badge bg-dark text-white me-1">{{product.category2}}</span>
                                <span class="badge bg-dark text-white">{{product.category3}}</span>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Cart</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Buy</button>
                            </div>
                            <small clss="text-dark">{{product.product_price}}</small>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>
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
           this.productList = await this.$api("/api/productList",{});
           console.log(this.productList);
        },
        goToDetail(id) {
            this.$router.push({path:'detail', query:{id:id}});
        }
    }
}
</script>
