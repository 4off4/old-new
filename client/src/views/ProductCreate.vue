<template>
    <main class="mt-3">
      <div class="container">
          <h2 class="text-center">Register Product</h2>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Product Name</label>
              <div class="col-md-9">
                  <input type="text" class="form-control">
              </div>
          </div>
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Price</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>    
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Shipping Charge</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control">
                      <span class="input-group-text">$</span>
                  </div>
              </div>
          </div>        
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Additional Shipping Charge</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <input type="number" class="form-control">
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
                  <input type="text" class="form-control">
              </div>
          </div>   
          <div class="mb-3 row">
              <label class="col-md-3 col-form-label">Release date</label>
              <div class="col-md-9">
                  <div class="input-group mb-3">
                      <span class="input-group-text">within</span>
                      <input type="number" class="form-control">
                      <span class="input-group-text">days</span>
                  </div>
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
    }
  }
</script>