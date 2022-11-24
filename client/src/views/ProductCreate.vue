<template>
    <main class="mt-3">
      <div class="container">
          <h2 class="text-center">Register Product</h2>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product Name</label>
              <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.product_name">
              </div>
          </div>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Price</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control" v-model="product.product_price">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>    
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Shipping Charge</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control" v-model="product.delivery_price">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>        
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Additional Shipping Charge</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control" v-model="product.add_delivery">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>     
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Category</label>
              <div class="col-md-9">
                  <div class="row">
                      <div class="col-auto">
                          <select class="form-select" v-model="cate1" @change="changeCategory1">
                              <option :value="cate" :key=i v-for="(cate,i) in category1">{{cate}}</option>
                          </select>
                      </div>
                      <div class="col-auto">
                          <select class="form-select" v-model="cate2" @change="changeCategory2">
                              <option :value="cate" :key=i v-for="(cate,i) in category2">{{cate}}</option>
                          </select>
                      </div>
                      <div class="col-auto">
                          <select class="form-select" v-model="cate3">
                                <option :value="cate" :key=i v-for="(cate,i) in category3">{{cate}}</option>
                          </select>
                      </div>                               
                  </div>
              </div>
          </div> 
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Tag</label>
              <div class="col-md-9">
                  <input type="text" class="form-control" v-model="product.tags">
              </div>
          </div>   
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Release date</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <span class="input-group-text">within</span>
                      <input type="number" class="form-control" v-model="product.outbound_days">
                      <span class="input-group-text">days</span>
                  </div>
              </div>
          </div>       
          <div class="mb-3 row">
              <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-dark">Cancel</button>
              </div>
              <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-danger" @click="productInsert">Save</button>
              </div>
          </div>                                                     
      </div>
  </main>
</template>
<script>
export default {
    data(){
        return {
            product: {
                product_name: "",
                product_price: 0,
                delivery_price: 0,
                add_delivery: 0,
                tags: "",
                outbound_days: 0,
                seller_id: 1,
                category_id: 1,
                id: 7 //nextVal 사용해야함
            },
            categoryList: [],
            category1:[],
            category2:[],
            category3:[],
            cate1: "",
            cate2: "",
            cate3: ""
        };
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    created(){
        this.getCategoryList();
    },
    mounted(){
      if(this.user.email == undefined) {
        alert("로그인 해주세요!");
        this.$router.push({path:'/'});
      }
    },
    methods: {
        goToList() {
            this.$router.push({path:'/sales'});
        },
        async getCategoryList(){
            let categoryList = await this.$api("/api/categoryList",{});
            this.categoryList = categoryList;
            let oCategory = {};
            categoryList.forEach(item => {
                oCategory[item.category1] = item.id;
            });

            let category1 = [];
            for(let key in oCategory){
                category1.push(key);
            } 
            this.category1 = category1;

            let category2 = [];
            category2 = categoryList.filter(c => {      //filter는 만족한 조건에 해당하는 것만 가져와
                return c.category1 == category1[0];
            });

            let oCategory2 = {};
            category2.forEach(item => {
                oCategory2[item.category2] = item.id;
            });

            category2 = [];
            for(let key in oCategory2) {
                category2.push(key);
            }

            this.category2 = category2;
        },
        changeCategory1(){
            //카테고리3번 초기화
            this.category3 = [];

            let categoryList = this.categoryList.filter(c => {
                return c.category1 == this.cate1;
            });

            let oCategory2 = {};
            categoryList.forEach(item => {
                oCategory2[item.category2] = item.id;
            });

            let category2 = [];
            for(let key in oCategory2) {
                category2.push(key);
            }

            this.category2 = category2;
        },
        changeCategory2(){
            let categoryList = this.categoryList.filter(c => {
                return (c.category1 == this.cate1 && c.category2 == this.cate2);
            });

            let oCategory3 = {};
            categoryList.forEach(item => {
                oCategory3[item.category3] = item.id;
            });

            let category3 = [];
            for(let key in oCategory3) {
                category3.push(key);
            }

            this.category3 = category3;
        },
        productInsert() {
            //입력값이 없을 경우
            if(this.product.product_name == ""){
                return this.$swal("product name is empty!");                
            }

           //제품가격이 0이거나 null일때
            if(this.product.product_price == "" || this.product.product_price == 0){
                return this.$swal("Please enter the price of product!");                
            }
            
            //출고일 0이거나 null일때
            if(this.product.outbound_days == "" || this.product.outbound_days == 0){
                return this.$swal("Please enter the release date!");                
            }

            //저장하면서, category 컬럼에 값을 입력해주는 로직
            this.product.category_id = this.categoryList.filter(c => {
                return (c.category1 == this.cate1 && c.category2 == this.cate2 && c.category3 == this.cate3);
            })[0].id;

            console.log(this.product.category_id);

            this.$swal.fire({
                title: 'Would you like to register?',
                showCancelButton: true,
                confirmButtonText: 'Create',
                cancelButtonText: 'Cancel',
                }).then(async(result) => {
                if (result.isConfirmed) {
                    await this.$api("/api/productInsert",{param:[this.product]});
                    this.$swal.fire('Save Success!', '', 'success');
                    this.$router.push({path:'/sales'});
                }
            });
        }
    },
}
</script>