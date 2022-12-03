<template>
  <div class="daummap">
    <h1>우편번호: <span>{{ zip }}</span></h1>
    <h1>기본주소: <span>{{ addr1 }}</span></h1>
    <h1>상세주소: <span>{{ addr2 }}</span></h1>
    <div ref="embed"></div>
    <button @click="showApi">주소API 호출</button>
  </div>
</template>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
export default{
  mounted() {
      new window.daum.Postcode({
      oncomplete: function(data) {
        console.log('주소 : '+data);
      }
    }).open();
  }
};
</script>