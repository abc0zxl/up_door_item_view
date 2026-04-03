<script>
</script>
<template>
      <!-- 搜索框：直接浮在轮播图上 -->
        <view class="search-box">
          <view class="search-input-wrapper">
            <text class="search-icon">search</text>
            <input 
              class="search-input" 
              placeholder="Search for cleaning, maintenance..." 
              type="text"
            />
          </view>
          <button class="search-btn">搜索</button>
        </view>
</template>

<style>


/* 搜索框样式 */
.search-box {
  background: white;
  border-radius: 50px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.search-icon {
  margin-right: 8px;
  color: #999;
}
.search-input {
  border: 0;
  outline: none;
  font-size: 14px;
  width: 100%;
}
.search-btn {
  background: #FF7A00;
  color: white;
  border-radius: 50px;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
}
</style>