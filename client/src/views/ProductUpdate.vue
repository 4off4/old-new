<template>
    <main class="mt-3">
      <div class="container">
          <h2 class="text-center">Update Product</h2>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product Name</label>
              <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.product_name">
              </div>
          </div>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Price</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control" v-model="productDetail.product_price">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>    
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Shipping Charge</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control" v-model="productDetail.delivery_price">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>        
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Additional Shipping Charge</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control" v-model="productDetail.add_delivery">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>     
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Category</label>
              <div class="col-md-9">
                  <div class="row">
                      <div class="col-auto">
                          <select class="form-select">
                              <option>Electronics</option>
                          </select>
                      </div>
                      <div class="col-auto">
                          <select class="form-select">
                              <option>Apple</option>
                          </select>
                      </div>
                      <div class="col-auto">
                          <select class="form-select">
                              <option>Acc</option>
                          </select>
                      </div>                               
                  </div>
              </div>
          </div> 
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Tag</label>
              <div class="col-md-9">
                  <input type="text" class="form-control" v-model="productDetail.tags">
              </div>
          </div>   
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Release date</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <span class="input-group-text">within</span>
                      <input type="number" class="form-control" v-model="productDetail.outbound_days">
                      <span class="input-group-text">days</span>
                  </div>
              </div>
          </div>       
          <div class="mb-3 row">
              <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-dark">Cancel</button>
              </div>
              <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-danger">Save</button>
              </div>
          </div>                                                     
      </div>
  </main>
</template>
<script>
  export default {
    data(){
        return {
            id: 0,
            productDetail: {}
        };
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted(){
      if(this.user.email == undefined) {
        alert("로그인 해주세요!");
        this.$router.push({path:'/'});
      }
    },
    created() {
        this.id = this.$route.query.id;
        this.getProductDetail();
    },
    methods: {
        goToList() {
            this.$router.push({path:'/sales'});
        },
        async getProductDetail() {
            let productDetail = await this.$api("/api/productDetail",{param:[this.id]});
            if(productDetail.length > 0){
            this.productDetail = productDetail[0];
            }
        }      
    }
  }
</script>