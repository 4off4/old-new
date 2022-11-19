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
                  <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==1)">
                        <div class="position-relative">
                            <img :src="`/download/${id}/${m.path}`" class="img-fluid" />
                            <div class="position-absolute top-0 end-0" style="cursor:pointer;" @click="deleteImage(m.id)">X</div>
                        </div>
                    </div>
                  </div>
                  <input class="form-control" type="file" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1)">
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
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==2)">
                            <div class="position-relative">
                                <img :src="`/download/${id}/${m.path}`" class="img-fluid" />
                                <div class="position-absolute top-0 end-0" style="cursor:pointer;" @click="deleteImage(m.id)">X</div>
                            </div>
                        </div>
                    </div>
                  <input class="form-control" type="file" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 2)" multiple>
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
                    <div class="row">
                        <div class="col-lg-6 col-md-8">
                            <input class="form-control" type="file" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 3)">
                            <div class="alert alert-secondary" role="alert">
                                <ul>
                                    <li>File Size        : 5M or less</li>
                                    <li>File extension   : png, jpeg</li>
                                </ul>
                            </div>
                        </div>
                    <div class="col-lg-6 col-md-4" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==3)">
                        <div class="position-relative">
                            <img :src="`/download/${id}/${m.path}`" class="img-fluid" />
                            <div class="position-absolute top-0 end-0" style="cursor:pointer;color:white;" @click="deleteImage(m.id)">X</div>
                        </div>
                    </div>
              </div>
            </div>
        </div>             
        <div class="mb-3 row m-auto">
            <button type="button" class="btn btn-lg btn-dark" @click="goToList">OK</button>
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
        },
        deleteImage(id) {
            this.$swal.fire({
                title: '정말 삭제 하시겠습니까?',
                showCancelButton: true,
                confirmButtonText: `삭제`,
                cancelButtonText: `취소`
            }).then(async (result) => {
                if (result.isConfirmed) {
                await this.$api("/api/imageDelete",{param:[id]});
                this.getProductImage();
                this.$swal.fire('삭제되었습니다!', '', 'success');
                } 
            });
        },
        async uploadFile(files, type) {
            let name = "";
            let data = null;
            if (files) {
                name = files[0].name;
                data = await this.$base64(files[0]);
            }
            const { error } = await this.$api(`/upload/${this.id}/${type}/${name}`, { data });
            if (error) {
                return this.$swal("이미지 업로드 실패했습니다. 다시 시도하세요.");
            }
            this.$swal("이미지가 업로드 되었습니다.");
            setTimeout(() => {
                this.getProductImage();
            }, 1000);
        }
    }
  }
</script>