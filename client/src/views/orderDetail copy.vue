<template>
       <div class="wrap">
      <div class="product-img"></div>
      <div class="product-desc">
        <h2>
          이쁜 핸드폰 케이스 팝니다
          <span class="price"> 가격:5,000</span>
        </h2>
        <p>모든 기종 판매하오니 관심제품은 상세페이지 참조</p>
      </div>
      <div class="item-order">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">주문자이름</span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">수량</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>-- 수량을 선택하세요 --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">주소</span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">전화번호</span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <button type="button" onclick="order()" class="btn btn-primary btn-order">
          주문하기
        </button>
      </div>
    </div>
</template>
<style scoped>
    * {
    font-family: "Jua", sans-serif;
    }
    .product-img {
    width: 500px;
    height: 300px;
    background-image: url("http://th3.tmon.kr/thumbs/image/a6d/d92/42a/ba9f7e411_700x700_95_FIT.jpg");
    background-position: center;
    background-size: cover;
    }
    .product-desc {
    width: 500px;
    margin-top: 20px;
    margin-bottom: 20px;
    }

    .price {
    font-size: 20px;
    font-style: italic;
    }

    .item-order {
    width: 500px;
    }

    .btn-order {
    margin: auto;
    width: 100px;

    display: block;
    }
    .wrap {
    width: 500px;
    padding-top: 50px;
    margin: auto;
    }
</style>