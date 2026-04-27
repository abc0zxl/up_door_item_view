<template>
    <view class="container">
        <view class="status-box">
            <text class="success-icon">✓</text>
            <text class="status-text">支付成功</text>
            <text class="amount">订单号：{{ orderNo }}</text>
            <button class="confirm-btn" @click="goToOrderDetail">查看订单详情</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            orderNo: '',
            status: 'success'
        };
    },
    
    onLoad(options) {
        console.log('URL Scheme 回调参数:', options);
        this.orderNo = options.outTradeNo || '';
        this.status = options.status || 'success';
        
        this.showPaymentResult();
        this.handlePaymentCallback();
    },
    
    methods: {
        showPaymentResult() {
            if (this.status === 'success') {
                uni.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                });
            }
        },
        
        handlePaymentCallback() {
            // 关闭所有页面，跳转到订单详情
            setTimeout(() => {
                if (this.orderNo) {
                    uni.reLaunch({
                        url: `/pages/pageOrder/orderDetail/orderDetail?out_trade_no=${this.orderNo}`
                    });
                } else {
                    uni.reLaunch({
                        url: '/pages/index/index'
                    });
                }
            }, 1500);
        },
        
        goToOrderDetail() {
            if (this.orderNo) {
                uni.reLaunch({
                    url: `/pages/pageOrder/orderDetail/orderDetail?out_trade_no=${this.orderNo}`
                });
            } else {
                uni.reLaunch({
                    url: '/pages/index/index'
                });
            }
        }
    }
}
</script>

<style>
.container {
    padding: 40px 20px;
    text-align: center;
    background: #f8f8f8;
    min-height: 100vh;
}

.status-box {
    background: #fff;
    border-radius: 12px;
    padding: 40px 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    margin-top: 50px;
}

.success-icon {
    font-size: 60px;
    color: #07c160;
    display: block;
    margin-bottom: 15px;
}

.status-text {
    font-size: 18px;
    color: #333;
    margin: 15px 0;
    display: block;
    font-weight: bold;
}

.amount {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    display: block;
}

.confirm-btn {
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    width: 100%;
}
</style>