<template>
    <body>
    <section class="cart">
        <div class="cart__information">
            <ul>
                <li>장바구니 상품은 최대 30일간 저장됩니다.</li>
                <li>가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.</li>
                <li>오늘출발 상품은 판매자 설정 시점에 따라 오늘출발 여부가 변경될 수 있으니 주문 시 꼭 다시 확인해 주시기 바랍니다.</li>
            </ul>
        </div>
            <table class="cart__list">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Shipping Charge</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="i" v-for="(userCart, i) in userCartList">
                        <td>
                        <img v-if="userCart.path!=null" :src="`/download/${userCart.product_id}/${userCart.path}/0`" style="height:50px;width:auto;" />
                        </td>
                        <td>{{userCart.product_name}}</td>
                        <td>{{userCart.product_price}}</td>
                        <td>{{userCart.delivery_price}}</td>
                        
                        <td>
                            <button type="button" class="btn btn-danger" @click="deleteProduct(userCart.product_id);">delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        <div class="cart__mainbtns">
            <button class="cart__bigorderbtn left" @click="goToHome()">Home</button> &nbsp;&nbsp;
            <button class="cart__bigorderbtn right" @click="goToOrderDetail()">Order</button>
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

    p,
    span {
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

    .cart {
    width: 80%;
    margin: auto;
    padding: 30px;
    }

    .cart ul {
    background-color: whitesmoke;
    padding: 30px;
    margin-bottom: 50px;
    border: whitesmoke solid 1px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 300;
    }

    .cart ul :first-child {
    color: limegreen;
    }

    table {
    border-top: solid 1.5px black;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    }

    thead {
    text-align: center;
    font-weight: bold;
    }

    tbody {
    font-size: 12px;
    }

    td {
    padding: 15px 0px;
    border-bottom: 1px solid lightgrey;
    }

    .cart__list__detail :nth-child(3) {
    vertical-align: top;
    }

    .cart__list__detail :nth-child(3) a {
    font-size: 12px;
    }

    .cart__list__detail :nth-child(3) p {
    margin-top: 6px;
    font-weight: bold;
    }

    .cart__list__smartstore {
    font-size: 12px;
    color: gray;
    }

    .cart__list__option {
    vertical-align: top;
    padding: 20px;
    }

    .cart__list__option p {
    margin-bottom: 25px;
    position: relative;
    }

    .cart__list__option p::after {
    content: "";
    width: 90%;
    height: 1px;
    background-color: lightgrey;
    left: 0px;
    top: 25px;
    position: absolute;
    }

    .cart__list__optionbtn {
    background-color: white;
    font-size: 10px;
    border: lightgrey solid 1px;
    padding: 7px;
    }

    .cart__list__detail :nth-child(4),
    .cart__list__detail :nth-child(5),
    .cart__list__detail :nth-child(6) {
    border-left: 2px solid whitesmoke;
    }

    .cart__list__detail :nth-child(5),
    .cart__list__detail :nth-child(6) {
    text-align: center;
    }

    .cart__list__detail :nth-child(5) button {
    background-color: limegreen;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 4px 8px;
    font-size: 12px;
    margin-top: 5px;
    }

    .price {
    font-weight: bold;
    }

    .cart__mainbtns {
    width: 420px;
    height: 200px;
    padding-top: 40px;
    display: block;
    margin: auto;
    }

    .cart__bigorderbtn {
    width: 200px;
    height: 50px;
    font-size: 16px;
    margin: auto;
    border-radius: 5px;
    }

    .cart__bigorderbtn.left {
    background-color: white;
    border: 1px lightgray solid;
    }

    .cart__bigorderbtn.right {
    background-color: limegreen;
    color: white;
    border: none;
    }
</style>
<script>
export default {
    data(){
        return {
          userCartList: [],
          userEmail : this.$store.state.user.email
        };
    },
    created() {
        this.getCartList();
    },
    methods: {
        async getCartList() {
          this.userCartList = await this.$api("/api/cartList",{param:[this.userEmail]});
          console.log(this.userCartList);
        },
        deleteProduct(productId) {
            this.$swal.fire({
                title: 'Do you want to Delete the product?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: `Cancel`,
                }).then(async(result) => {
                if (result.isConfirmed) {
                    console.log(productId);
                    await this.$api("/api/cartListDelete",{param:[this.userEmail,productId]});
                    this.getCartList();
                    this.$swal.fire('Delete!', '', 'success')
                }
            });
        },
        goToOrderDetail(){
            this.$router.push({path:'/orderDetail'});
        },
        goToHome(){
            this.$router.push({path:'/'});
        }
    }
}
</script>
