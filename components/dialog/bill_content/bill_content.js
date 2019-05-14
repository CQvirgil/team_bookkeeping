// components/dialog/bill_content/bill_content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    radio_button_data: [{ //账单内容弹窗数据
        id: 1,
        value: '一般',
        checked: false,
        radio_button_style: 'radio-button-check'
      },
      {
        id: 2,
        value: '餐饮',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 3,
        value: '住宿',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 4,
        value: '交通',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 5,
        value: '门票',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 6,
        value: '购物',
        checked: false,
        radio_button_style: 'radio-button'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //单选按钮点击事件
    radio_check: function(e) {
      console.log(e.currentTarget.dataset.id)
      var data = this.data.radio_button_data
      var text = ''
      //遍历按钮数据
      for (var i = 0; i < this.data.radio_button_data.length; i++) {
        //判断传回的id是否等于当前遍历的id
        if (e.currentTarget.dataset.id == this.data.radio_button_data[i].id) {
          //设置当前遍历的数据为已点击状态
          data[i].checked = true
          text = data[i].value
        } else {
          data[i].checked = false
        }
        //判断是否为点击状态
        if (data[i].checked) {
          data[i].radio_button_style = 'radio-button-check'
        } else {
          data[i].radio_button_style = 'radio-button'
        }
        this.setData({
          radio_button_data: data,
          bill_content: text
        })
      }
    },
  }
})