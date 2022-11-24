<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <!-- SELECT 표시 삭제 -->
                <!-- <div class="col-12">
                    <select class="form-select">
                        <option selected>select</option>
                        <option value="1">Mac</option>
                        <option value="2">Phone</option>
                        <option value="3">Acc</option>
                    </select>
                </div> -->
            </div> 
            <div class="row g-3">
                <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(product,i) in productList">
                    <div class="card" style="width: 18rem;">
                        <a @click="goToDetail(product.id);" style="cursor:pointer">
                            <img :src="`/download/${product.id}/${product.path}/0`" class="img-fluid"/>
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
                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToCart(i,product.path)">Cart</button>
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
          productList: [],
          userEmail : this.$store.state.user.email
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        async getProductList() {
           this.productList = await this.$api("/api/productList",{});
           //console.log(this.productList);
        },
        goToDetail(id) {
            this.$router.push({path:'detail', query:{id:id}});
        },
        goToCart(i,path) {
            console.log(i);
            //제품가격이 0이거나 null일때
            if( this.productList[i].product_price == 0){
                return this.$swal("out of stock.");                
            }
            this.$swal.fire({
                title: 'Would you like to add to cart?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let id = this.productList[i].id;
                    let product_name = this.productList[i].product_name;
                    let product_price = this.productList[i].product_price;
                    let delivery_price = this.productList[i].delivery_price;
                   // let add_delivery = this.productList[i].add_delivery;
                    let buyer_id = this.userEmail;   //buyer_id는 로그인 한 사람의 이메일
                    let category_id = this.productList[i].category_id;
                    let tags = this.productList[i].tags;
                    await this.$api("/api/cartInsert",{param:[id,product_name,product_price,delivery_price,buyer_id,category_id,tags,path]});
                    this.$router.push({path:'/cart', query:{id:id}});   //장바구니로 이동
                }
            });
        }
    }
}
</script>
