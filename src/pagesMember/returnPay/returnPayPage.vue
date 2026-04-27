<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>支付结果 - 商盟帮</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .payment-container {
            background: white;
            border-radius: 20px;
            padding: 40px 30px;
            box-shadow: 0 10px 30px rgba(255, 133, 27, 0.15);
            max-width: 420px;
            width: 100%;
            text-align: center;
            border: 1px solid #ffefe0;
        }
        
        .success-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ff851b 0%, #ff6b00 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            box-shadow: 0 8px 20px rgba(255, 133, 27, 0.3);
        }
        
        .success-icon::after {
            content: "✓";
            font-size: 40px;
            color: white;
            font-weight: bold;
        }
        
        .status-title {
            font-size: 24px;
            font-weight: 700;
            color: #2e2f2f;
            margin-bottom: 8px;
        }
        
        .status-desc {
            font-size: 16px;
            color: #5b5c5b;
            margin-bottom: 30px;
            line-height: 1.5;
        }
        
        .amount-display {
            font-size: 36px;
            font-weight: 700;
            color: #ff851b;
            margin-bottom: 25px;
            text-shadow: 0 2px 4px rgba(255, 133, 27, 0.2);
        }
        
        .order-info {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            text-align: left;
            border: 1px solid #e9ecef;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .info-item:last-child {
            margin-bottom: 0;
        }
        
        .info-label {
            color: #5b5c5b;
            font-weight: 500;
        }
        
        .info-value {
            color: #2e2f2f;
            font-weight: 600;
        }
        
        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 30px;
        }
        
        .btn {
            padding: 16px 30px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: block;
            text-align: center;
        }
        
        .btn:active {
            transform: scale(0.98);
        }
        
        .btn.primary {
            background: linear-gradient(135deg, #ff851b 0%, #ff6b00 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(255, 133, 27, 0.3);
        }
        
        .btn.primary:hover {
            box-shadow: 0 6px 20px rgba(255, 133, 27, 0.4);
            transform: translateY(-1px);
        }
        
        .btn.secondary {
            background: white;
            color: #5b5c5b;
            border: 2px solid #e9ecef;
        }
        
        .btn.secondary:hover {
            border-color: #ff851b;
            color: #ff851b;
        }
        
        .company-info {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }
        
        .company-name {
            font-size: 14px;
            color: #5b5c5b;
            font-weight: 500;
        }
        
        .auto-redirect {
            margin-top: 15px;
            font-size: 13px;
            color: #5b5c5b;
        }
        
        .countdown {
            color: #ff851b;
            font-weight: 600;
        }
        
        @media (max-width: 480px) {
            .payment-container {
                padding: 30px 20px;
                margin: 10px;
            }
            
            .amount-display {
                font-size: 32px;
            }
            
            .status-title {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="payment-container">
        <!-- 成功图标 -->
        <div class="success-icon"></div>
        
        <!-- 支付状态 -->
        <div class="status-title">支付成功</div>
        <div class="status-desc">感谢您的购买，订单已支付完成</div>
        
        <!-- 支付金额 -->
        <div class="amount-display">¥<span th:text="${amount}">299.00</span></div>
        
        <!-- 订单信息 -->
        <div class="order-info">
            <div class="info-item">
                <span class="info-label">订单号：</span>
                <span class="info-value" th:text="${orderNo}">20240426123456</span>
            </div>
            <div class="info-item">
                <span class="info-label">支付时间：</span>
                <span class="info-value" th:text="${payTime}">2024-04-26 14:30:25</span>
            </div>
            <div class="info-item" th:if="${tradeNo}">
                <span class="info-label">交易号：</span>
                <span class="info-value" th:text="${tradeNo}">202404261234567890</span>
            </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="action-buttons">
            <a th:href="@{/order/detail?orderNo={orderNo}(orderNo=${orderNo})}" class="btn primary">
                支付完成
            </a>
            <a th:href="@{/}" class="btn secondary">返回应用</a>
        </div>
        
        <!-- 自动跳转提示 -->
        <div class="auto-redirect" th:if="${orderNo}">
            <span id="countdown" class="countdown">5</span>秒后自动跳转到订单详情
        </div>
        
        <!-- 公司信息 -->
        <div class="company-info">
            <div class="company-name">商盟帮 - 专业的商家服务平台</div>
        </div>
    </div>

    <script th:if="${orderNo}">
        // 自动跳转逻辑
        let countdown = 5;
        const countdownElement = document.getElementById('countdown');
        
        const timer = setInterval(() => {
            countdown--;
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }
            
            if (countdown <= 0) {
                clearInterval(timer);
                window.location.href = '/order/detail?orderNo=' + '[[${orderNo}]]';
            }
        }, 1000);
        
        // 点击任意地方停止自动跳转
        document.addEventListener('click', () => {
            clearInterval(timer);
            const redirectElement = document.querySelector('.auto-redirect');
            if (redirectElement) {
                redirectElement.style.display = 'none';
            }
        });
    </script>
</body>
</html>