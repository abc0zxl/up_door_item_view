<script>
/* eslint-disable */
import { ref, reactive, computed, watch, onMounted, getCurrentInstance, nextTick } from 'vue';

let vk; // vk依赖
let goodsCache = reactive({}); // 本地商品缓存

export default {
  name: 'vk-data-goods-sku-popup',
  emits: ['update:modelValue', 'input', 'update-goods', 'open', 'close', 'add-cart', 'buy-now', 'cart', 'buy', 'num-change'],
  props: {
    // true 组件显示 false 组件隐藏
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    // vk云函数路由模式参数开始-----------------------------------------------------------
    // 商品id
    goodsId: {
      type: String,
      default: ''
    },
    // vk路由模式框架下的云函数地址
    action: {
      type: String,
      default: ''
    },
    // vk云函数路由模式参数结束-----------------------------------------------------------
    // 该商品已抢完时的按钮文字
    noStockText: {
      type: String,
      default: '该商品已抢完'
    },
    // 库存文字
    stockText: {
      type: String,
      default: '库存'
    },
    // 商品表id的字段名
    goodsIdName: {
      type: String,
      default: '_id'
    },
    // sku表id的字段名
    skuIdName: {
      type: String,
      default: '_id'
    },
    // sku_list的字段名
    skuListName: {
      type: String,
      default: 'sku_list'
    },
    // spec_list的字段名
    specListName: {
      type: String,
      default: 'spec_list'
    },
    // 库存的字段名 默认 stock
    stockName: {
      type: String,
      default: 'stock'
    },
    // sku组合路径的字段名
    skuArrName: {
      type: String,
      default: 'sku_name_arr'
    },
    // 默认单规格时的规格组名称
    defaultSingleSkuName: {
      type: String,
      default: '默认'
    },
    // 模式 1:都显示  2:只显示购物车 3:只显示立即购买 4:显示缺货按钮 默认 1
    mode: {
      type: [Number, String, null],
      default: 1
    },
    // 点击遮罩是否关闭组件 true 关闭 false 不关闭 默认true
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // 顶部圆角值
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    // 商品缩略图字段名(未选择sku时)
    goodsThumbName: {
      type: [String],
      default: 'goods_thumb'
    },
    // 商品缩略图背景颜色，如#999999
    goodsThumbBackgroundColor: {
      type: String,
      default: 'transparent'
    },
    // 最小购买数量 默认 1
    minBuyNum: {
      type: [Number, String],
      default: 1
    },
    // 最大购买数量 默认 100000
    maxBuyNum: {
      type: [Number, String],
      default: 100000
    },
    // 步进器步长 默认 1
    stepBuyNum: {
      type: [Number, String],
      default: 1
    },
    // 是否只能输入 step 的倍数
    stepStrictly: {
      type: Boolean,
      default: false
    },
    // 自定义获取商品信息的函数,支付宝小程序不支持该属性,请使用localdata属性
    customAction: {
      type: [Function],
      default: null
    },
    // 本地数据源
    localdata: {
      type: Object
    },
    // 价格的字体颜色
    priceColor: {
      type: String
    },
    // 立即购买按钮的文字
    buyNowText: {
      type: String,
      default: '立即购买'
    },
    // 立即购买按钮的字体颜色
    buyNowColor: {
      type: String
    },
    // 立即购买按钮的背景颜色
    buyNowBackgroundColor: {
      type: String
    },
    // 加入购物车按钮的文字
    addCartText: {
      type: String,
      default: '加入购物车'
    },
    // 加入购物车按钮的字体颜色
    addCartColor: {
      type: String
    },
    // 加入购物车按钮的背景颜色
    addCartBackgroundColor: {
      type: String
    },
    // 不可点击时,按钮的样式
    disableStyle: {
      type: Object,
      default: null
    },
    // 按钮点击时的样式
    activedStyle: {
      type: Object,
      default: null
    },
    // 按钮常态的样式
    btnStyle: {
      type: Object,
      default: null
    },
    // 是否显示右上角关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 关闭按钮的图片地址
    closeImage: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAEyUlEQVR42sSZeWwNURTGp4OqtBo7sSXELragdkpQsRRJ1Zr4hyJiJ9YgxNIg1qANiT+E1i5IY0kVVWtQEbuEKLFGUSH27/ANN5PXmTvzupzkl/tm8t6b7517lnvvC0lKSjJ8WmnQAUSDFqABqALKgl8gD7wE90E2SAeXwFf1SxISErQeVtKHwCgwFsSDSIf3hYFKoCkYDBaDdyAViHdueHmoF6FtwDLQ23b/E7gM7oIcejIERIDaoBFoC8qA8mA8SQNz6W1XC9GY+nCQCCYAk/c+gF0gBZwH312+IxR0BCPBUIaH2A+wHsxHCHxx+gLT5QGN6a2JfG8uvVCDws9oiDQYlxkMGfHyQvARlADTwcXk5OT6foV2kS8ATXidymlcyen1a/Jjl9IJh3hPkjELYqO8Cu0KjjNZvtETw5jFBWXPmGSTGQKSeOn5iQ0kVLL0CINfPNcPbDMKyRCbGzEMBJ+ZD8cChYFdqGTqfsWT8otPGoVsEHsMwxDFs3shNsxJ6BrQ0Po8OGUUkVHsNCVml+cntB1jUWwn2GEUsTEMrASbDK+2CCQ0kYX6nfLLisMmKqUr0S60M+jG10vAm+JSCa8+x7CKlzHwaktV6DiObzUzPJIxFO1BQ12wGtTReO9GetVgY/kjNJzZbcWmTjHfxw51AsRqvL8eOAtmsJuFu3g1l+1ZLB5eDTVZ3K0P7tL0TkWOpSg61kVkBtuuNRthGs+wtJST5aQI7cEbkkRXNYVKgX6kIdYuUhYzMQwxN8tiExCLFqHNeSF9/aem0BzGp5PYQCJ7c/Gsk1RfuSD6U1dNpcDf9ZigTmKbMRZ9iVTsHscGJluW2FMf1SSQWGnBmaB6kCJVTVVNJZE++Cx9drEllS1KMCINpURFmEbBWA63Fz9s95cGIdJgp/zXmT4pZcOvSUzuZttTbblmnc3PIjjmidDXvKgdhMh0JdbzuCjWrbNOVovjS5P7bkPJ/mBESkz2BO0166ybNeJ431S2q+01NntuIq3E0amzjiZtk9tssWyTDzO4525bACK9NAUn68TtkNhpEXpOSagRml+S6iLSSeweHv242Qhl13rRyvoDvDlKyTQny/ZQJ+1iH7vVbEx7OR5UiKVIO7VicgvHCtwrudloMIV7/0uadVYW57O4Wvvi8v4pymlKkrpwvsDeLLZAY2pkwbAB3PSQfC+4cH7l4k1ZH8zkZRq8ecO+Z5rN40JJqnXFuGfaxPCTLjcn0OZOpnArXw8HY4paIbw5CcMgXq6HN2/mt6+XGLrN15tBryIUGavMpCTrfKcDCKkAceA9S8nhAOehhSUyhXpkBxxnP4YM1InugP7cBkjBPcqVUWFYCEROxXiQz5JlXV+IfKh7mpfJac+lZ6V87QXVClBkTc7YWsWTPSDyitfzUTlJlj8TbvE6jluDOdwZ+jX57GLO3ADeuyZrDYi86vV81FD2UVGsmT+5Zl0BnkhoseOEaogL46pqO4v/IqUEyalIR4h85BgjHv6+aUWRMbb7EstX6O0cpT1Gco0ry8fWygLDMjmDnQeBt3Qe7uVfkeugDwVLcsVzGsuwLXbV+I63XNAkG5r/hvgRqgqWs6pJPKrsbvz/Q6yyun0w/h6lP+BnzrCpfPMT2L8FGAA7k1GZ/vnaqAAAAABJRU5ErkJggg=='
    },
    // 是否隐藏库存显示
    hideStock: {
      type: Boolean,
      default: false
    },
    // 颜色主题
    theme: {
      type: String,
      default: 'default'
    },
    // 请求中的提示
    actionTips: {
      type: String,
      default: '请求中...'
    },
    // 默认选中的SKU
    defaultSelect: {
      type: Object
    },
    // 是否使用缓存
    useCache: {
      type: Boolean,
      default: true
    },
    /**
     * 默认商品,设置该值可快速展示商品
     * 逻辑: 先展示 defaultGoods 信息,再取数据库,再更新页面(通常为更新库存)
     */
    defaultGoods: {
      type: Object
    },
    /**
     * 金额是否需要除以100
     * 1:金额会除以100
     * 0:金额不会除以100
     */
    amountType: {
      type: Number,
      default: 1
    },
    // 每次选择完SKU后，购买数量归1，如果有最小购买数量，则设置为最小购买数量
    selectedInit: {
      type: Boolean,
      default: false
    },
    // 是否开启底部安全区适配，默认true
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 990
    }
  },
  setup(props, { emit, expose }) {
    const instance = getCurrentInstance();
    vk = instance.proxy.vk;
    
    // 数据状态
    const complete = ref(false);
    const goodsInfo = ref({});
    const isShow = ref(false);
    const initKey = ref(true);
    const shopItemInfo = ref({});
    const selectArr = ref([]);
    const subIndex = ref([]);
    const selectShop = ref({});
    const selectNum = ref(props.minBuyNum || 1);
    const outFoStock = ref(false);
    const openTime = ref(0);
    const clickTime = ref(0);
    
    // 主题颜色配置
    const themeColor = {
      default: {
        priceColor: 'rgb(254, 86, 10)',
        buyNowColor: '#ffffff',
        buyNowBackgroundColor: 'rgb(254, 86, 10)',
        addCartColor: '#ffffff',
        addCartBackgroundColor: 'rgb(255, 148, 2)',
        btnStyle: {
          color: '#333333',
          borderColor: '#f4f4f4',
          backgroundColor: '#ffffff'
        },
        activedStyle: {
          color: 'rgb(254, 86, 10)',
          borderColor: 'rgb(254, 86, 10)',
          backgroundColor: 'rgba(254,86,10,0.1)'
        },
        disableStyle: {
          color: '#c3c3c3',
          borderColor: '#f6f6f6',
          backgroundColor: '#f6f6f6'
        }
      },
      'red-black': {
        priceColor: 'rgb(255, 68, 68)',
        buyNowColor: '#ffffff',
        buyNowBackgroundColor: 'rgb(255, 68, 68)',
        addCartColor: '#ffffff',
        addCartBackgroundColor: 'rgb(85, 85, 85)',
        activedStyle: {
          color: 'rgb(255, 68, 68)',
          borderColor: 'rgb(255, 68, 68)',
          backgroundColor: 'rgba(255,68,68,0.1)'
        }
      },
      'black-white': {
        priceColor: 'rgb(47, 47, 52)',
        buyNowColor: '#ffffff',
        buyNowBackgroundColor: 'rgb(47, 47, 52)',
        addCartColor: 'rgb(47, 47, 52)',
        addCartBackgroundColor: 'rgb(235, 236, 242)',
        activedStyle: {
          color: 'rgb(47, 47, 52)',
          borderColor: 'rgba(47,47,52,0.12)',
          backgroundColor: 'rgba(47,47,52,0.12)'
        }
      },
      coffee: {
        priceColor: 'rgb(195, 167, 105)',
        buyNowColor: '#ffffff',
        buyNowBackgroundColor: 'rgb(195, 167, 105)',
        addCartColor: 'rgb(195, 167, 105)',
        addCartBackgroundColor: 'rgb(243, 238, 225)',
        activedStyle: {
          color: 'rgb(195, 167, 105)',
          borderColor: 'rgb(195, 167, 105)',
          backgroundColor: 'rgba(195, 167, 105,0.1)'
        }
      },
      green: {
        priceColor: 'rgb(99, 190, 114)',
        buyNowColor: '#ffffff',
        buyNowBackgroundColor: 'rgb(99, 190, 114)',
        addCartColor: 'rgb(99, 190, 114)',
        addCartBackgroundColor: 'rgb(225, 244, 227)',
        activedStyle: {
          color: 'rgb(99, 190, 114)',
          borderColor: 'rgb(99, 190, 114)',
          backgroundColor: 'rgba(99, 190, 114,0.1)'
        }
      }
    };
    
    // 计算属性
    const valueCom = computed(() => {
      return props.modelValue;
    });
    
    const maxBuyNumCom = computed(() => {
      let maxStock = getMaxStock();
      let max = props.maxBuyNum || 100000;
      if (max > maxStock) {
        max = maxStock;
      }
      return max;
    });
    
    const isManyCom = computed(() => {
      const specList = goodsInfo.value[props.specListName];
      let isMany = true;
      if (
        specList &&
        specList.length === 1 &&
        specList[0].list.length === 1 &&
        specList[0].name === props.defaultSingleSkuName
      ) {
        isMany = false;
      }
      return isMany;
    });
    
    const priceCom = computed(() => {
      let str = '';
      if (selectShop.value[props.skuIdName]) {
        str = priceFilter(selectShop.value.price);
      } else {
        let skuList = goodsInfo.value[props.skuListName];
        if (skuList && skuList.length > 0) {
          let valueArr = [];
          skuList.map((skuItem) => {
            valueArr.push(skuItem.price);
          });
          let min = priceFilter(Math.min(...valueArr));
          let max = priceFilter(Math.max(...valueArr));
          if (min === max) {
            str = min + '';
          } else {
            str = `${min} - ${max}`;
          }
        }
      }
      return str;
    });
    
    const stockCom = computed(() => {
      let str = '';
      if (selectShop.value[props.stockName]) {
        str = selectShop.value[props.stockName];
      } else {
        let skuList = goodsInfo.value[props.skuListName];
        if (skuList && skuList.length > 0) {
          let valueArr = [];
          skuList.map((skuItem) => {
            valueArr.push(skuItem[props.stockName]);
          });
          let min = Math.min(...valueArr);
          let max = Math.max(...valueArr);
          if (min === max) {
            str = min;
          } else {
            str = `${min} - ${max}`;
          }
        }
      }
      return str;
    });
    
    // 方法
    const getArrayToString = (arr) => {
      let str = '';
      arr.map((item, index) => {
        item = item.replace(/\./g, '。');
        if (index == 0) {
          str += item;
        } else {
          str += ',' + item;
        }
      });
      return str;
    };
    
    const getListItem = (list, key, value) => {
      let item;
      for (let i in list) {
        if (typeof value == 'object') {
          if (JSON.stringify(list[i][key]) === JSON.stringify(value)) {
            item = list[i];
            break;
          }
        } else {
          if (list[i][key] === value) {
            item = list[i];
            break;
          }
        }
      }
      return item;
    };
    
    const getListIndex = (list, key, value) => {
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i][key] === value) {
          index = i;
          break;
        }
      }
      return index;
    };
    
    const checkItem = () => {
      const { stockName, skuListName, skuArrName } = props;
      const originalSkuList = goodsInfo.value[skuListName];
      let skuList = [];
      let stockNum = 0;
      originalSkuList.map((skuItem) => {
        if (skuItem[stockName] > 0) {
          skuList.push(skuItem);
          stockNum += skuItem[stockName];
        }
      });
      if (stockNum <= 0) {
        outFoStock.value = true;
      }
      
      const result = skuList.reduce(
        (arrs, items) => {
          return arrs.concat(
            items[skuArrName].reduce(
              (arr, item) => {
                return arr.concat(
                  arr.map(item2 => {
                    if (!Object.prototype.hasOwnProperty.call(shopItemInfo.value, getArrayToString([...item2, item]))) {
                      shopItemInfo.value[getArrayToString([...item2, item])] = items;
                    }
                    return [...item2, item];
                  })
                );
              },
              [[]]
            )
          );
        },
        [[]]
      );
    };
    
    const checkInpath = (clickIndex) => {
      const specListName = props.specListName;
      let specList = goodsInfo.value[specListName];
      for (let i = 0, len = specList.length; i < len; i++) {
        if (i == clickIndex) {
          continue;
        }
        let len2 = specList[i].list.length;
        for (let j = 0; j < len2; j++) {
          if (subIndex.value[i] != -1 && j == subIndex.value[i]) {
            continue;
          }
          let choosed_copy = [...selectArr.value];
          choosed_copy[i] = specList[i].list[j].name;
          let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
          if (Object.prototype.hasOwnProperty.call(shopItemInfo.value, getArrayToString(choosed_copy2))) {
            specList[i].list[j].ishow = true;
          } else {
            specList[i].list[j].ishow = false;
          }
        }
      }
      goodsInfo.value[specListName] = specList;
    };
    
    const checkSelectShop = () => {
      if (selectArr.value.every(item => item != '')) {
        selectShop.value = shopItemInfo.value[getArrayToString(selectArr.value)];
        let stock = selectShop.value[props.stockName];
        if (typeof stock !== 'undefined' && selectNum.value > stock) {
          selectNum.value = stock;
        }
        if (selectNum.value > props.maxBuyNum) {
          selectNum.value = props.maxBuyNum;
        }
        if (selectNum.value < props.minBuyNum) {
          selectNum.value = props.minBuyNum;
        }
        if (props.selectedInit) {
          selectNum.value = props.minBuyNum || 1;
        }
      } else {
        selectShop.value = {};
      }
    };
    
    const init = (notAutoClick) => {
      selectArr.value = [];
      subIndex.value = [];
      selectShop.value = {};
      selectNum.value = props.minBuyNum || 1;
      outFoStock.value = false;
      shopItemInfo.value = {};
      let specListName = props.specListName;
      goodsInfo.value[specListName].map((item, index) => {
        selectArr.value.push('');
        subIndex.value.push(-1);
      });
      checkItem();
      checkInpath(-1);
      if (!notAutoClick) autoClickSku();
    };
    
    const autoClickSku = () => {
      const { stockName, skuListName, specListName } = props;
      let skuList = goodsInfo.value[skuListName];
      let specListArr = goodsInfo.value[specListName];
      if (specListArr.length == 1) {
        let specList = specListArr[0].list;
        for (let i = 0; i < specList.length; i++) {
          let sku = getListItem(skuList, props.skuArrName, [specList[i].name]);
          if (sku && sku[stockName] > 0) {
            skuClick(specList[i], 0, i);
            break;
          }
        }
      }
    };
    
    const skuClick = (value, index1, index2) => {
      if (value.ishow) {
        if (selectArr.value[index1] != value.name) {
          selectArr.value[index1] = value.name;
          subIndex.value[index1] = index2;
        } else {
          selectArr.value[index1] = '';
          subIndex.value[index1] = -1;
        }
        checkInpath(index1);
        checkSelectShop();
      }
    };
    
    const checkSelectComplete = (obj = {}) => {
      let nowTime = new Date().getTime();
      if (clickTime.value && nowTime - clickTime.value < 400) {
        return false;
      }
      clickTime.value = nowTime;
      const { selectShop: shop, selectNum: num, stockText, stockName } = props;
      if (!selectShop.value || !selectShop.value[props.skuIdName]) {
        toast('请先选择对应规格', 'none');
        return false;
      }
      if (num <= 0) {
        toast('购买数量必须>0', 'none');
        return false;
      }
      if (num > selectShop.value[stockName]) {
        toast(stockText + '不足', 'none');
        return false;
      }
      if (typeof obj.success == 'function') obj.success(selectShop.value);
    };
    
    const updateGoodsInfo = (goodsInfoData) => {
      const { skuListName, goodsIdName } = props;
      if (JSON.stringify(goodsInfo.value) === '{}' || goodsInfo.value[goodsIdName] !== goodsInfoData[goodsIdName]) {
        goodsInfo.value = goodsInfoData;
        initKey.value = true;
      } else {
        goodsInfo.value[skuListName] = goodsInfoData[skuListName];
      }
      if (initKey.value) {
        initKey.value = false;
        init();
      }
      let select_sku_info = getListItem(goodsInfo.value[skuListName], props.skuIdName, selectShop.value[props.skuIdName]);
      Object.assign(selectShop.value, select_sku_info);
      defaultSelectSku();
      complete.value = true;
    };
    
    const findGoodsInfo = (obj = {}) => {
      const { useCache } = obj;
      if (typeof vk == 'undefined') {
        toast('custom-action必须是function', 'none');
        return false;
      }
      const { actionTips } = props;
      let actionTitle = '';
      let actionAoading = false;
      if (actionTips !== 'custom') {
        actionTitle = useCache ? '' : '请求中...';
      } else {
        actionAoading = useCache ? false : true;
      }
      vk.callFunction({
        url: props.action,
        title: actionTitle,
        loading: actionAoading,
        data: {
          goods_id: props.goodsId
        },
        success(data) {
          updateGoodsInfo(data.goodsInfo);
          goodsCache[props.goodsId] = data.goodsInfo;
          emit('update-goods', data.goodsInfo);
        },
        fail() {
          updateValue(false);
        }
      });
    };
    
    const updateValue = (value) => {
      if (value) {
        emit('open', true);
        emit('input', true);
        emit('update:modelValue', true);
      } else {
        emit('input', false);
        emit('close', 'close');
        emit('update:modelValue', false);
      }
    };
    
    const open = async () => {
      openTime.value = new Date().getTime();
      let findGoodsInfoRun = true;
      let useCache = false;
      let goodsInfoData = goodsCache[props.goodsId];
      if (goodsInfoData && props.useCache) {
        useCache = true;
        updateGoodsInfo(goodsInfoData);
      } else {
        complete.value = false;
      }
      if (props.customAction && typeof props.customAction === 'function') {
        try {
          goodsInfoData = await props.customAction({
            useCache,
            goodsId: props.goodsId,
            goodsInfo: goodsInfoData,
            close: function() {
              setTimeout(function() {
                close();
              }, 500);
            }
          }).catch(err => {
            setTimeout(function() {
              close();
            }, 500);
          });
        } catch (err) {
          let { message = '' } = err;
          if (message.indexOf('.catch is not a function') > -1) {
            toast('custom-action必须返回一个Promise', 'none');
            setTimeout(function() {
              close();
            }, 500);
            return false;
          }
        }
        goodsCache[props.goodsId] = goodsInfoData;
        if (goodsInfoData && typeof goodsInfoData == 'object' && JSON.stringify(goodsInfoData) != '{}') {
          findGoodsInfoRun = false;
          updateGoodsInfo(goodsInfoData);
          updateValue(true);
        } else {
          toast('未获取到商品信息', 'none');
          emit('input', false);
          return false;
        }
      } else if (typeof props.localdata !== 'undefined' && props.localdata !== null) {
        goodsInfoData = props.localdata;
        if (goodsInfoData && typeof goodsInfoData == 'object' && JSON.stringify(goodsInfoData) != '{}') {
          findGoodsInfoRun = false;
          updateGoodsInfo(goodsInfoData);
          updateValue(true);
        } else {
          toast('未获取到商品信息', 'none');
          emit('input', false);
          return false;
        }
      } else {
        if (findGoodsInfoRun) findGoodsInfo({ useCache });
      }
    };
    
    const close = (s) => {
      if (new Date().getTime() - openTime.value < 400) {
        return false;
      }
      if (s == 'mask') {
        if (props.maskCloseAble !== false) {
          emit('input', false);
          emit('close', 'mask');
          emit('update:modelValue', false);
        }
      } else {
        emit('input', false);
        emit('close', 'close');
        emit('update:modelValue', false);
      }
    };
    
    const moveHandle = () => {
      // 禁止父元素滑动
    };
    
    const addCart = () => {
      checkSelectComplete({
        success: function(selectShopData) {
          selectShopData.buy_num = selectNum.value;
          emit('add-cart', selectShopData);
          emit('cart', selectShopData);
        }
      });
    };
    
    const buyNow = () => {
      checkSelectComplete({
        success: function(selectShopData) {
          selectShopData.buy_num = selectNum.value;
          emit('buy-now', selectShopData);
          emit('buy', selectShopData);
        }
      });
    };
    
    const toast = (title, icon) => {
      uni.showToast({
        title: title,
        icon: icon
      });
    };
    
    const defaultSelectSku = () => {
      const { defaultSelect } = props;
      if (defaultSelect && defaultSelect.sku && defaultSelect.sku.length > 0) {
        selectSku(defaultSelect);
      }
    };
    
    const selectSku = (obj = {}) => {
      const { sku: skuArr, num: newNum } = obj;
      let specListArr = goodsInfo.value[props.specListName];
      if (skuArr && specListArr.length === skuArr.length) {
        let skuClickArr = [];
        let clickKey = true;
        for (let index = 0; index < skuArr.length; index++) {
          let skuName = skuArr[index];
          let specList = specListArr[index].list;
          let index1 = index;
          let index2 = getListIndex(specList, 'name', skuName);
          if (index2 == -1) {
            clickKey = false;
            break;
          }
          skuClickArr.push({
            spec: specList[index2],
            index1: index1,
            index2: index2
          });
        }
        if (clickKey) {
          init(true);
          skuClickArr.map(item => {
            skuClick(item.spec, item.index1, item.index2);
          });
        }
      }
      if (newNum > 0) selectNum.value = newNum;
    };
    
    const priceFilter = (n = 0) => {
      if (typeof n == 'string') {
        n = parseFloat(n);
      }
      if (props.amountType === 0) {
        return n.toFixed(2);
      } else {
        return (n / 100).toFixed(2);
      }
    };
    
    const pushGoodsCache = (goodsInfoData) => {
      const { goodsIdName } = props;
      goodsCache[goodsInfoData[goodsIdName]] = goodsInfoData;
    };
    
    const stop = () => {};
    
    const previewImage = () => {
      const { selectShop: shop, goodsInfo: info, goodsThumbName } = props;
      let src = selectShop.value.image ? selectShop.value.image : info[goodsThumbName];
      if (src) {
        uni.previewImage({
          urls: [src]
        });
      }
    };
    
    const getMaxStock = () => {
      let maxStock = 0;
      const { selectShop: shop = {}, goodsInfo: info = {}, skuListName, stockName } = props;
      if (selectShop.value[stockName]) {
        maxStock = selectShop.value[stockName];
      } else {
        let skuList = goodsInfo.value[skuListName];
        if (skuList && skuList.length > 0) {
          let valueArr = [];
          skuList.map((skuItem) => {
            valueArr.push(skuItem[stockName]);
          });
          let max = Math.max(...valueArr);
          maxStock = max;
        }
      }
      return maxStock;
    };
    
    const numChange = (e) => {
      emit('num-change', e.value);
    };
    
    const themeColorFn = (name) => {
      let color = props[name] ? props[name] : themeColor[props.theme][name];
      return color;
    };
    
    // 监听器
    watch(valueCom, (newVal) => {
      if (newVal) {
        open();
      }
    });
    
    watch(() => props.defaultGoods, (newVal) => {
      const { goodsIdName } = props;
      if (typeof newVal === 'object' && newVal && newVal[goodsIdName] && !goodsCache[newVal[goodsIdName]]) {
        pushGoodsCache(newVal);
      }
    }, { immediate: true });
    
    // 暴露方法给父组件
    expose({
      selectSku,
      close,
      open
    });
    
    return {
      // 数据
      complete,
      goodsInfo,
      isShow,
      initKey,
      shopItemInfo,
      selectArr,
      subIndex,
      selectShop,
      selectNum,
      outFoStock,
      openTime,
      // 计算属性
      valueCom,
      maxBuyNumCom,
      isManyCom,
      priceCom,
      stockCom,
      // 方法
      init,
      findGoodsInfo,
      updateValue,
      close,
      moveHandle,
      skuClick,
      checkSelectShop,
      checkInpath,
      checkItem,
      getArrayToString,
      getListItem,
      getListIndex,
      checkSelectComplete,
      addCart,
      buyNow,
      toast,
      updateGoodsInfo,
      autoClickSku,
      defaultSelectSku,
      selectSku,
      priceFilter,
      pushGoodsCache,
      stop,
      previewImage,
      getMaxStock,
      numChange,
      themeColorFn
    };
  }
};
</script>


<template>
	<!-- #ifndef MP-TOUTIAO -->
	<view class="vk-data-goods-sku-popup" :style="{ zIndex: zIndex }" catchtouchmove="true" :class="valueCom && complete ? 'show' : 'none'" @touchmove.stop.prevent="moveHandle" @click.stop="stop">
	<!-- #endif -->
	<!-- #ifdef MP-TOUTIAO -->
	<view class="vk-data-goods-sku-pop
	up" :style="{ zIndex: zIndex }" :class="valueCom && complete ? 'show' : 'none'" @touchmove.stop.prevent="moveHandle" @click.stop="stop">
	<!-- #endif -->
		<!-- 页面内容开始 -->
		<view class="mask" @click="close('mask')"></view>
		<view class="layer attr-content" :class="{'safe-area-inset-bottom':safeAreaInsetBottom }" :style="{ borderRadius: borderRadius + 'rpx ' + borderRadius + 'rpx 0 0' }">
			<view class="specification-wrapper">
				<scroll-view class="specification-wrapper-content" scroll-y="true">
					<view class="specification-header">
						<view class="specification-left">
							<image
								class="product-img"
								:src="selectShop.image ? selectShop.image : goodsInfo[goodsThumbName]"
								:style="{ backgroundColor: goodsThumbBackgroundColor }"
								mode="aspectFill"
								@click="previewImage"
							></image>
						</view>
						<view class="specification-right">
							<view class="price-content" :style="{ color: themeColorFn('priceColor') }">
								<text class="sign">¥</text>
								<text class="price" :class="priceCom.length > 16 ? 'price2' : ''">{{ priceCom }}</text>
							</view>
							<view class="inventory" v-if="!hideStock">{{ stockText }}：{{ stockCom }}</view>
							<view class="inventory" v-else></view>
							<view class="choose" v-show="isManyCom">已选：{{ selectArr.join(' ') }}</view>
						</view>
					</view>

					<view class="specification-content">
						<view v-show="isManyCom" class="specification-item" v-for="(item, index1) in goodsInfo[specListName]" :key="index1">
							<view class="item-title">{{ item.name }}</view>
							<view class="item-wrapper">
								<view
									class="item-content"
									v-for="(item_value, index2) in item.list"
									:key="index2"
									:class="[item_value.ishow ? '' : 'noactived', subIndex[index1] == index2 ? 'actived' : '']"
									:style="[
										item_value.ishow ? '' : themeColorFn('disableStyle'),
										item_value.ishow ? themeColorFn('btnStyle') : '',
										subIndex[index1] == index2 ? themeColorFn('activedStyle') : ''
									]"
									@click="skuClick(item_value, index1, index2)"
								>
									{{ item_value.name }}
								</view>
							</view>
						</view>
						<view class="number-box-view">
							<view style="flex: 1;">数量</view>
							<view style="flex: 4;text-align: right;">
								<vk-data-input-number-box
									v-model="selectNum"
									:min="minBuyNum || 1"
									:max="maxBuyNumCom"
									:step="stepBuyNum || 1"
									:step-strictly="stepStrictly"
									:positive-integer="true"
									@change="numChange"
								></vk-data-input-number-box>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="close" @click="close('close')" v-if="showClose != false"><image class="close-item" :src="closeImage"></image></view>
			</view>

			<view class="btn-wrapper" v-if="outFoStock || Number(mode) == 4">
				<view class="sure" style="color:#ffffff;background-color:#cccccc">{{ noStockText }}</view>
			</view>
			<view class="btn-wrapper" v-else-if="Number(mode) == 1">
				<view
					class="sure add-cart"
					style="border-radius:38rpx 0rpx 0rpx 38rpx;"
					:style="{
						color: themeColorFn('addCartColor'),
						backgroundColor: themeColorFn('addCartBackgroundColor')
					}"
					@click="addCart"
				>
					{{ addCartText }}
				</view>

				<view
					class="sure"
					style="border-radius:0rpx 38rpx 38rpx 0rpx;"
					:style="{
						color: themeColorFn('buyNowColor'),
						backgroundColor: themeColorFn('buyNowBackgroundColor')
					}"
					@click="buyNow"
				>
					{{ buyNowText }}
				</view>
			</view>
			<view class="btn-wrapper" v-else-if="Number(mode) == 2">
				<view
					class="sure add-cart"
					:style="{
						color: themeColorFn('addCartColor'),
						backgroundColor: themeColorFn('addCartBackgroundColor')
					}"
					@click="addCart"
				>
					{{ addCartText }}
				</view>
			</view>
			<view class="btn-wrapper" v-else-if="Number(mode) == 3">
				<view
					class="sure"
					:style="{
						color: themeColorFn('buyNowColor'),
						backgroundColor: themeColorFn('buyNowBackgroundColor')
					}"
					@click="buyNow"
				>
					{{ buyNowText }}
				</view>
			</view>
		</view>
		<!-- 页面内容结束 -->
	</view>
	<!-- </view> -->
</template>

<style lang="scss" scoped>
/*  sku弹出层 */
.vk-data-goods-sku-popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 990;
	overflow: hidden;
	&.show {
		display: block;

		.mask {
			animation: showPopup 0.2s linear both;
		}

		.layer {
			animation: showLayer 0.2s linear both;
			bottom: var(--window-bottom);
		}
	}

	&.hide {
		.mask {
			animation: hidePopup 0.2s linear both;
		}

		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}

	&.none {
		display: none;
	}
	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.layer {
		display: flex;
		width: 100%;
		// height: 1014rpx;
		flex-direction: column;
		// min-height: 40vh;
		// max-height: 1014rpx;
		position: fixed;
		z-index: 99;
		bottom: 0;
		border-radius: 10rpx 10rpx 0 0;
		background-color: #fff;

		.specification-wrapper {
			width: 100%;
			padding: 30rpx 25rpx;
			box-sizing: border-box;
			.specification-wrapper-content {
				width: 100%;
				max-height: 900rpx;
				min-height: 300rpx;
				&::-webkit-scrollbar {
					/*隐藏滚轮*/
					display: none;
				}

				.specification-header {
					width: 100%;
					display: flex;
					flex-direction: row;
					position: relative;
					margin-bottom: 40rpx;

					.specification-left {
						width: 180rpx;
						height: 180rpx;
						flex: 0 0 180rpx;

						.product-img {
							width: 180rpx;
							height: 180rpx;
						}
					}

					.specification-right {
						flex: 1;
						padding: 0 35rpx 0 28rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						font-weight: 500;

						.price-content {
							color: #fe560a;
							margin-bottom: 20rpx;

							.sign {
								font-size: 28rpx;
							}

							.price {
								margin-left: 4rpx;
								font-size: 48rpx;
							}
							.price2 {
								margin-left: 4rpx;
								font-size: 36rpx;
							}
						}

						.inventory {
							font-size: 24rpx;
							color: #999999;
							margin-bottom: 14rpx;
						}

						.choose {
							font-size: 28rpx;
							color: #333333;
						}
					}
				}

				.specification-content {
					font-weight: 500;

					.specification-item {
						margin-bottom: 40rpx;

						&:last-child {
							margin-bottom: 0;
						}

						.item-title {
							margin-bottom: 20rpx;
							font-size: 28rpx;
							color: #999999;
						}

						.item-wrapper {
							display: flex;
							flex-direction: row;
							flex-flow: wrap;

							.item-content {
								display: inline-block;
								padding: 10rpx 35rpx;
								font-size: 24rpx;
								border-radius: 10rpx;
								background-color: #ffffff;
								color: #333333;
								margin-right: 20rpx;
								margin-bottom: 16rpx;
								border: 1px solid #f4f4f4;
								box-sizing: border-box;
								&.actived {
									border-color: #fe560a;
									color: #fe560a;
								}

								&.noactived {
									background-color: #f6f6f6;
									border-color: #f6f6f6;
									color: #c3c3c3;
								}
							}
						}
					}
					.number-box-view {
						display: flex;
						padding-top: 30rpx;
					}
				}
			}
			.close {
				position: absolute;
				top: 30rpx;
				right: 25rpx;
				width: 50rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				.close-item {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
		.btn-wrapper {
			display: flex;
			width: 100%;
			height: 120rpx;
			flex: 0 0 120rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 26rpx;
			box-sizing: border-box;
			.layer-btn {
				width: 335rpx;
				height: 76rpx;
				border-radius: 38rpx;
				color: #fff;
				line-height: 76rpx;
				text-align: center;
				font-weight: 500;
				font-size: 28rpx;

				&.add-cart {
					background: #ffbe46;
				}

				&.buy {
					background: #fe560a;
				}
			}
			.sure {
				width: 698rpx;
				height: 68rpx;
				border-radius: 38rpx;
				color: #fff;
				line-height: 68rpx;
				text-align: center;
				font-weight: 500;
				font-size: 28rpx;
				background: #fe560a;
			}
			.sure.add-cart {
				background: #ff9402;
			}
		}
		.btn-wrapper.safe-area-inset-bottom{
			padding-bottom: 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}

		100% {
			transform: translateY(0%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(120%);
		}
	}
}
</style>
