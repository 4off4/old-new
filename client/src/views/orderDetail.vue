<template>
    <body>
    <section class="order">
        <div class="">
            <ul>
                <li>장바구니 상품은 최대 30일간 저장됩니다.</li>
                <li>가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.</li>
                <li>오늘출발 상품은 판매자 설정 시점에 따라 오늘출발 여부가 변경될 수 있으니 주문 시 꼭 다시 확인해 주시기 바랍니다.</li>
            </ul>
        </div>
        <div class="orderHistory">
           <table class="cart__list">
                <thead>
                    <tr>
                        <th style="width:40px;padding:20px 0;"></th>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Shipping Charge</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="i" v-for="(userCart, i) in userCartList">
                        <td style="background-color: whitesmoke;">{{i+1}}</td>
                        <td><img v-if="userCart.path!=null" :src="`/download/${userCart.product_id}/${userCart.path}/0`" style="height:50px;width:auto;" /></td>
                        <td>{{userCart.product_name}}</td>
                        <td>{{userCart.product_price}}</td>
                        <td>{{userCart.delivery_price}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/><br/>
        <div class="orderList">
            <table class="orderTable">
                <thead style="text-align: left;">
                    <tr>
                        <td class="orderTabetd">Name&nbsp;<span style="color:red">*</span></td>
                        <td><input type="text" id="name1" size="5" maxlength="5" style="width:100px;"/></td>
                    </tr>
                    <tr>
                        <td class="orderTabetd">Address&nbsp;<span style="color:red">*</span></td>
                        <td>
                            <input type="text" id="postnum1" size="10" maxlength="5" />&nbsp;&nbsp;
                            <button type="button" class="btn btn-outline-dark">Zip code</button><br/>
                            <!-- <button type="button" style="cursor:pointer; margin-bottom:10px; background-color:#fff">Zip code</button><br/> -->
                            <input type="text" id="addr1" size="50" style="margin-bottom:10px;" /><br/>
                            <input type="text" id="addr2" size="50" />
                        </td>
                    </tr>
                    <tr>
                        <td class="orderTabetd">Phone Number&nbsp;<span style="color:red">*</span></td>
                        <td><input type="text" size="3" style="width:100px;"/>-<input type="text" size="5" style="width:100px;"/>-<input type="text" size="5" style="width:100px;"/></td>
                    </tr>
                    <tr>
                        <td class="orderTabetd">Message</td>
                        <td><textarea rows="3" cols="100" style="width:500px; height:100px"></textarea></td>
                    </tr>
                </thead>
            </table>
        </div>
        <br/><hr/><br/>
        <div class="payList">
            <table class="calc">
                <tr>
                    <th>Total Price</th>
                    <th>Shipping Charge</th>
                    <th style="width:500px; padding:22px 0;">Total Pay</th>
                </tr>
                <tr style="background-color: #fff;">
                    <td style="padding: 23px 0;"><span class="price">{{this.priceCount}}</span>$</td>
                    <td><span class="price">{{this.deliveryCount}}</span>$</td>
                    <td>= <span class="price">{{this.totalCount}}</span>$</td>
                </tr>
            </table>
            <br/><br/>
        </div>
        <!-- 버튼 -->
        <div class="order__mainbtns">
            <button class="order__bigorderbtn left" @click="goToCart()">Cancel</button> &nbsp;&nbsp;
            <button class="order__bigorderbtn right" @click="goToOrderDetail()">Pay</button>
        </div>
    </section>
</body>
</template>
<style scoped>
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

    p,span {
        margin: 0;
    }

    a {
        color: black;
    }

    img {
        display: block;
        width: 80%;
        height: 80px;
        margin: auto;
    }

    /* 전체적인 div 정리 */
    .order {
        width: 80%;
        margin: auto;
        padding: 30px;
    }

    .order ul {
        background-color: whitesmoke;
        padding: 30px;
        margin-bottom: 50px;
        border: whitesmoke solid 1px;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 300;
    }

    .order ul :first-child {
        color: limegreen;
    }

    /* 장바구니 리스트 */
    .cart__list {
        border-top: solid 1.5px black;
        border-collapse: collapse;
        width: 100%;
        font-size: 14px;
    }

    .cart__list thead {
        text-align: center;
        font-weight: bold;
    }

    .cart__list tbody {
        font-size: 12px;
    }

    .cart__list td {
        padding: 15px 0px;
        border-bottom: 1px solid lightgrey;
    }

    .price {
        font-weight: bold;
    }

    /* 하단에 버튼들 */
    .order__mainbtns {
        width: 420px;
        height: 200px;
        padding-top: 40px;
        display: block;
        margin: auto;
    }

    .order__bigorderbtn {
        width: 200px;
        height: 50px;
        font-size: 16px;
        margin: auto;
        border-radius: 5px;
    }

    .order__bigorderbtn.left {
        background-color: white;
        border: 1px lightgray solid;
    }

    .order__bigorderbtn.right {
        background-color: limegreen;
        color: white;
        border: none;
    }
    /* 배송정보 */
    .orderTable {
        border: solid 1px gray;
        border-collapse: collapse;
        width: 100%;
        font-size: 12pt;
    }
    table.orderTable th, td { border: solid 1px #e0e0eb; padding: 12px 10px;}
    .orderTabetd {font-size: 12pt; background-color: whitesmoke;}
    .orderTable input, textarea {
        width: 300px;
        height: 30px;
        font-size: 13px;
        border: 0;
        border-radius: 15px;
        outline: none;
        padding-left: 10px;
        background-color: rgb(233, 233, 233);
    }

    /* 주문 금액 */
    table.calc {
        border: solid 1px #e0e0eb;
        border-collapse: collapse;
        background-color: #f5f5f0;
        width: 100%;
        font-size: 10pt;
    }
    table.calc th {
        border: solod 1px #e0e0eb;
    }
    table.calc td {
        border: solid 1px #e0e0eb;
    }

</style>
<script>
export default {
    data(){
        return {
          userCartList: [],
          userEmail : this.$store.state.user.email,
          priceCount: 0,
          deliveryCount: 0,
          totalCount: 0
        };
    },
    created() {
        this.getCartList();
    },
    methods: {
        async getCartList() {
          this.userCartList = await this.$api("/api/cartList",{param:[this.userEmail]});
          //console.log(this.userCartList);
          for(let i=0; i<this.userCartList.length; i++) {
              this.priceCount += this.userCartList[i].product_price;
              this.deliveryCount += this.userCartList[i].delivery_price;
          }
          this.totalCount = this.priceCount+this.deliveryCount;
        },
        goToOrderDetail(){
            this.$router.push({path:'/orderDetail'});
        },
        goToCart(){
            this.$router.push({path:'/cart'});
        }
    }
}
</script>
