//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')


const data = [
  {
    title: '侧弹',
    id: 'default',
    list: [
      { title: '顶弹', attr: 'top', type: 'primary', size: 'larger', parentId: 'default' },
      { title: '底弹', attr: 'bot', type: 'primary', size: 'larger', parentId: 'default' },
      { title: '左弹', attr: 'left', type: 'primary', size: 'larger', parentId: 'default' },
      { title: '右弹', attr: 'right', type: 'primary', size: 'larger', parentId: 'default' },
    ]
  },
  {
    title: '全屏侧弹',
    id: 'full',
    list: [
      { title: '顶弹', attr: 'top', type: 'fff-primary', size: 'larger', parentId: 'full' },
      { title: '底弹', attr: 'bot', type: 'fff-primary', size: 'larger', parentId: 'full' },
      { title: '左弹', attr: 'left', type: 'fff-primary', size: 'larger', parentId: 'full' },
      { title: '右弹', attr: 'right', type: 'fff-primary', size: 'larger', parentId: 'full' },
    ]
  },
]

const adpeteractionSide = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'title-primary-grey mb-20-r'
      },
      idf: item.id,
      liClass: ''
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {
            title: itemxx.title,
          },
        ],
        itemClass: ('mb-20-r btn-' + itemxx.type) + (itemxx.size ? ' btn-' + itemxx.size : ''),
        aim: 'openBar?direction=' + itemxx.attr,
        parent: item.id
      })
    })
  })
  return output
}

const actionSideData = {
  title: [
    {
      title: 'Modal',
      itemClass: 'title-lg-active'
    },
    {
      title: '弹出层',
      itemClass: 'title-primary-grey'
    }
  ],
  '@tree': {
    data: adpeteractionSide(data),
    listClass: 'mt-40-r',
  },
  titleClass: 'ml-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

Pager({
  data: {
    motto: Pager.item(actionSideData),
    actionSide: {
      id: 'actionSide1',
      title: [
        {title: '打开新侧弹', aim: 'open_as2'},
      ]
    }
  },
  openBar: function(e, query, inst) {
    const theAim = query.direction.replace(/_/g,"/")
    const aside1 = this.getElementsById('actionSide1')
    if (theAim) {
      switch (theAim) {
        case theAim:
          (()=>{
            const direction = theAim || 'right'
            aside1.reset()[direction]({
            itemClass: 'bar',
            title: [
              {title: '弹窗1', class: 'h2'},
              {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
              {
                title: '打开第二个弹窗',
                aim: 'open-as2'
              }
            ],
          })
          })()
        break;
      }
    }
  }
})