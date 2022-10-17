<template>
    <main class="mt-3">
      <div class="container">
          <h2 class="text-center">Register Product Image</h2>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product ID</label>
              <div class="col-md-9">
                  {{id}}
              </div>
          </div>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product Name</label>
              <div class="col-md-9">
                  {{productDetail.product_name}}
              </div>
          </div>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Main Image</label>
              <div class="col-md-9">
                  <input class="form-control" type="file" accept="image/png,image/jpeg">
                  <div class="alert alert-secondary" role="alert">
                      <ul>
                          <li>image Size       : 350*350</li>
                          <li>File Size        : 1M Max</li>
                          <li>File extension   : png, jpeg</li>
                      </ul>
                  </div>
              </div>
          </div>   
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product Images</label>
              <div class="col-md-9">
                  <input class="form-control" type="file" accept="image/png,image/jpeg" multiple>
                  <div class="alert alert-secondary" role="alert">
                      <ul>
                          <li>Up to 5</li>
                          <li>image Size       : 700*700</li>
                          <li>File Size        : 1M or less</li>
                          <li>File extension   : png, jpeg</li>
                          
                      </ul>
                  </div>
              </div>
          </div>    
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product datail Image</label>
              <div class="col-md-9">
                  <input class="form-control" type="file" accept="image/png,image/jpeg">
                  <div class="alert alert-secondary" role="alert">
                      <ul>
                          <li>File Size        : 5M or less</li>
                          <li>File extension   : png, jpeg</li>
                      </ul>
                  </div>
              </div>
          </div>             
          <div class="mb-3 row">
              <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-dark" @click="goToList">Cancel</button>
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
    data() {
        return {
            id:0,
            productName: "",
            productDetail: {},
            productImage: []
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
        this.getProductImage();
    },
    methods: {
        goToList() {
          this.$router.push({path:'/sales'});
        },
        async getProductDetail() {
          let productDetail = await this.$api("/api/productDetail",{param:[this.id]});
          if(productDetail.length > 0){
            this.productDetail = productDetail[0];
            this.totalPrice = this.productDetail.product_price * this.total;

            // if(this.productDetail.delivery_price == 0){
            //   this.productDetail.delivery_price = 'free';
            // }
          }
          console.log('this.productDetail',this.productDetail);
      },
      async getProductImage() {
          this.productImage = await this.$api("/api/productMainImages",{param:[this.id]});
          console.log('this.productImage', this.productImage);
          console.log(this.id);
      }
    },
  }
</script>