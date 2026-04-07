<script setup>
import { ref } from 'vue'

// 帮助分类数据
const helpCategories = ref([
  {
    id: 1,
    title: '订单问题',
    icon: '📦',
    questions: [
      {
        id: 101,
        question: '如何查看订单状态？',
        answer: '您可以在"我的订单"页面查看所有订单的当前状态，包括待付款、待服务、已完成等状态。'
      },
      {
        id: 102,
        question: '订单可以取消吗？',
        answer: '在服务开始前2小时可以免费取消订单，超过时间将收取一定费用。'
      },
      {
        id: 103,
        question: '如何修改订单信息？',
        answer: '订单提交后如需修改，请联系客服或直接在订单详情页面进行操作。'
      }
    ]
  },
  {
    id: 2,
    title: '支付问题',
    icon: '💳',
    questions: [
      {
        id: 201,
        question: '支持哪些支付方式？',
        answer: '我们支持微信支付、支付宝、银行卡支付等多种支付方式。'
      },
      {
        id: 202,
        question: '支付失败怎么办？',
        answer: '支付失败可能是网络问题或账户余额不足，请检查后重试或联系客服。'
      },
      {
        id: 203,
        question: '可以开发票吗？',
        answer: '可以，在订单完成后可以在订单详情页面申请开具发票。'
      }
    ]
  },
  {
    id: 3,
    title: '服务问题',
    icon: '🔧',
    questions: [
      {
        id: 301,
        question: '服务时间如何安排？',
        answer: '您可以在预约时选择合适的时间段，我们会根据您的需求安排服务人员。'
      },
      {
        id: 302,
        question: '服务不满意怎么办？',
        answer: '如果对服务不满意，请在服务完成后24小时内联系客服，我们会重新安排服务。'
      },
      {
        id: 303,
        question: '可以指定服务人员吗？',
        answer: '可以，如果您有指定的服务人员，可以在预约时备注或联系客服安排。'
      }
    ]
  },
  {
    id: 4,
    title: '账户问题',
    icon: '👤',
    questions: [
      {
        id: 401,
        question: '如何修改个人信息？',
        answer: '在"我的"页面点击头像可以修改个人信息，包括昵称、头像等。'
      },
      {
        id: 402,
        question: '忘记密码怎么办？',
        answer: '在登录页面点击"忘记密码"，通过手机验证码可以重置密码。'
      },
      {
        id: 403,
        question: '如何注销账户？',
        answer: '如需注销账户，请联系客服处理，注销前请确保无未完成订单。'
      }
    ]
  },
  {
    id: 5,
    title: '其他问题',
    icon: '❓',
    questions: [
      {
        id: 501,
        question: '如何联系客服？',
        answer: '您可以在"我的"页面找到客服入口，或拨打客服热线400-123-4567。'
      },
      {
        id: 502,
        question: '服务范围包括哪些地区？',
        answer: '目前我们覆盖全国主要城市，具体可服务地区请查看服务详情页。'
      },
      {
        id: 503,
        question: '有优惠活动吗？',
        answer: '我们会定期推出优惠活动，请关注首页或通知中心获取最新优惠信息。'
      }
    ]
  }
])

// 展开状态
const expandedItems = ref({})

// 搜索关键词
const searchKeyword = ref('')

// 方法
const goBack = () => {
  uni.navigateBack()
}

const toggleQuestion = (categoryId, questionId) => {
  const key = `${categoryId}-${questionId}`
  expandedItems.value[key] = !expandedItems.value[key]
}

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    // 搜索逻辑
    console.log('搜索关键词:', searchKeyword.value)
  }
}

const contactCustomerService = () => {
  uni.showModal({
    title: '联系客服',
    content: '是否拨打客服热线：400-123-4567？',
    success: (res) => {
      if (res.confirm) {
        // 模拟拨打电话
        uni.showToast({
          title: '即将拨打客服电话',
          icon: 'none'
        })
      }
    }
  })
}

const handleFeedback = () => {
  uni.navigateTo({
    url: '/pagesMember/feedback/feedback'
  })
}

// 计算属性：搜索过滤
const filteredCategories = () => {
  if (!searchKeyword.value.trim()) {
    return helpCategories.value
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return helpCategories.value.map(category => {
    const filteredQuestions = category.questions.filter(question => 
      question.question.toLowerCase().includes(keyword) || 
      question.answer.toLowerCase().includes(keyword)
    )
    return {
      ...category,
      questions: filteredQuestions
    }
  }).filter(category => category.questions.length > 0)
}
</script>

<template>
  <view class="help-page">
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <button class="nav-btn" @click="goBack">
          <text class="material-symbols-outlined">←</text>
        </button>
        <view class="navbar-title">帮助中心</view>
        <view class="navbar-right">
          预留右侧按钮位置
        </view>
      </view>
    </view> -->

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 搜索框 -->
      <view class="search-section">
        <view class="search-box">
          <text class="search-icon">🔍</text>
          <input
            class="search-input"
            type="text"
            placeholder="搜索问题或关键词..."
            v-model="searchKeyword"
            @confirm="handleSearch"
          />
        </view>
      </view>

      <!-- 帮助分类列表 -->
      <view class="help-categories">
        <view 
          class="category-item" 
          v-for="category in filteredCategories()" 
          :key="category.id"
        >
          <!-- 分类标题 -->
          <view class="category-header">
            <text class="category-icon">{{ category.icon }}</text>
            <text class="category-title">{{ category.title }}</text>
          </view>
          
          <!-- 问题列表 -->
          <view class="questions-list">
            <view 
              class="question-item" 
              v-for="question in category.questions" 
              :key="question.id"
              @click="toggleQuestion(category.id, question.id)"
            >
              <view class="question-header">
                <text class="question-text">{{ question.question }}</text>
                <text 
                  class="material-symbols-outlined arrow"
                  :class="{ 'arrow-expanded': expandedItems[`${category.id}-${question.id}`] }"
                >
                  ↓
                </text>
              </view>
              
              <!-- 答案内容 -->
              <view 
                class="answer-content" 
                v-if="expandedItems[`${category.id}-${question.id}`]"
              >
                <text class="answer-text">{{ question.answer }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredCategories().length === 0">
        <view class="empty-icon">🔍</view>
        <text class="empty-title">未找到相关问题</text>
        <text class="empty-desc">请尝试其他关键词或联系客服</text>
      </view>

      <!-- 底部操作栏 -->
      <view class="bottom-actions">
        <button class="action-btn contact-btn" @click="contactCustomerService">
          <text class="btn-icon">📞</text>
          <text class="btn-text">联系客服</text>
        </button>
        <button class="action-btn feedback-btn" @click="handleFeedback">
          <text class="btn-icon">💬</text>
          <text class="btn-text">意见反馈</text>
        </button>
      </view>
    </main>
  </view>
</template>

<style lang="scss" scoped>
// 颜色变量（与项目保持一致）
$primary-color: #924700;
$primary-fixed: #ff851b;
$primary-light: #fff0e8;
$surface: #f7f6f5;
$surface-lowest: #ffffff;
$surface-container-low: #f1f1f0;
$surface-container: #e8e8e7;
$surface-container-high: #e2e2e1;
$surface-variant: #dcdddc;
$on-surface: #2e2f2f;
$on-surface-variant: #5b5c5b;
$outline-variant: #adadac;

.help-page {
  min-height: 100vh;
  background-color: $surface;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

// 顶部导航栏
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: $surface-lowest;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
}

.navbar-title {
  font-weight: 700;
  font-size: 36rpx;
  color: $on-surface;
}

.nav-btn {
  background: transparent;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;

  .material-symbols-outlined {
    font-size: 40rpx;
    color: $on-surface;
  }

  &:active {
    background-color: $surface-container;
  }
}

// 主内容区
.main-content {
  // padding-top: 88rpx;
  padding-bottom: 160rpx;
}

// 搜索区域
.search-section {
  padding: 32rpx;
}

.search-box {
  position: relative;
  background-color: $surface-lowest;
  border-radius: 40rpx;
  padding: 0 32rpx;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.search-icon {
  position: absolute;
  left: 32rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32rpx;
  color: $on-surface-variant;
}

.search-input {
  width: 100%;
  height: 80rpx;
  padding-left: 72rpx;
  padding-right: 32rpx;
  font-size: 28rpx;
  color: $on-surface;
  border: none;
  background: transparent;

  &::placeholder {
    color: $on-surface-variant;
  }
}

// 帮助分类
.help-categories {
  padding: 0 32rpx;
}

.category-item {
  margin-bottom: 32rpx;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
}

.category-icon {
  font-size: 36rpx;
}

.category-title {
  font-size: 32rpx;
  font-weight: 700;
  color: $on-surface;
}

// 问题列表
.questions-list {
  background-color: $surface-lowest;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.question-item {
  border-bottom: 1rpx solid $surface-container;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: $surface-container-low;
  }
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  cursor: pointer;
}

.question-text {
  font-size: 28rpx;
  font-weight: 600;
  color: $on-surface;
  flex: 1;
  margin-right: 16rpx;
}

.arrow {
  font-size: 28rpx;
  color: $outline-variant;
  transition: transform 0.3s ease;

  &.arrow-expanded {
    transform: rotate(180deg);
  }
}

.answer-content {
  padding: 0 32rpx 32rpx;
  border-top: 1rpx solid $surface-container;
  margin-top: -1rpx;
}

.answer-text {
  font-size: 26rpx;
  color: $on-surface-variant;
  line-height: 1.6;
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 32rpx;
  text-align: center;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.3;
}

.empty-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $on-surface;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 28rpx;
  color: $on-surface-variant;
}

// 底部操作栏
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, $surface-lowest, transparent);
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
  display: flex;
  gap: 24rpx;
}

.action-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  font-size: 28rpx;
  font-weight: 600;
  border: none;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
}

.contact-btn {
  background: linear-gradient(135deg, $primary-fixed, #ff6b00);
  color: $surface-lowest;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
}

.feedback-btn {
  background-color: $surface-lowest;
  color: $on-surface;
  border: 2rpx solid $surface-container;
}

.btn-icon {
  font-size: 32rpx;
}

.btn-text {
  font-weight: 600;
}

// 工具类
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>