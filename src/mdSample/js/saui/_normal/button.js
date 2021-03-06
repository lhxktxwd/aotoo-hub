const {lib, $$} = ao2
import Button from "components/items/button";

const adapter = (data) => {
  return data.map((item, ii) => {
    return {
      title: {
        title: item.title,
        itemClass: 'pages-title'
      },
      body: item.child.map((itemx, yy) => {
        let op = {}
        op = item.type ?
          item.type === 'load' ? 
          {
            '@item': itemx.type === 1 ?  <Button  $$id={'btn'+ii+yy} title={item.title} itemClass={itemx.name} loading={true} loadClass='icon-sm' loadType='1' tap='onBtnLoad' /> : <Button $$id={'btn'+ii+yy} title='点啊点啊' itemClass='btn-minor' loading='true' loadClass='icon-sm' loadType='2' tap='onBtnLoad'/>,
            itemClass: 'ml-default'
          }
          : {
            title: itemx.title,
            itemClass: 'ml-default ss-i-block ' + itemx.name
          }
        : {
          '@item': <Button title={item.title} itemClass={itemx.name} $$id={'btn'+ii+yy}  />,
          itemClass: 'ml-default'
        }
        return op
      }),
      bodyClass: 'mt-default  flex-row',
      itemClass: 'm-default'
    }
  })
}

function template(state, props) {
  //方式一
  // let btnList = ui_list({
  //   data: adapter(state.buttonList)
  // })
  // return (
  //   <View>
  //     <View className="pages-title-lg">按钮</View>
  //     <btnList.UI />
  //   </View>
  // )

  //方式二
  return (
    <>
      <View className="pages-title-lg">按钮</View>
      {
        state.buttonList.map((item, ii) => {
          ii = ii + 1
          return (
            <View className='m-default' key={'bl-'+ii}>
              <View className="pages-title">{ii + '、 ' +item.title}</View>
              <View className='mt-default'>
                {
                  item.child.map((itemx, jj) => {
                    return <Button key={'b-'+jj} title={itemx.title || item.title} itemClass={'ml-default ss-i-block ' + itemx.name} loading={itemx.load} loadClass='icon-sm' loadType={itemx.type} tap={this[itemx.tap]} />
                  })
                }
              </View>
            </View>
          )
        })
      }
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      buttonList: [
        {title: '默认', child: [{name: 'btn-default'}, {name: 'btn-minor'}, {name: 'disabled'}]},
        {title: '空心', child: [{name: 'btn-default plain'}, {name: 'btn-minor plain'}, {name: 'btn-grey plain'}]},
        {title: '圆角', child: [{name: 'btn-default round'}, {name: 'btn-minor round'}, {name: 'btn-grey round'}]},
        {title: '大小', child: [{name: 'btn-default larger plain'}, {name: 'btn-minor plain'}, {name: 'btn-grey small plain'}]},
        {title: '带加载效果', type: 'load', child: [{title: '自动关闭', name: 'btn-default', type: '1', tap: 'onBtnLoad', load: true}, {title: '手动关闭', name: 'btn-minor', tap: 'onBtnLoad', load: true}]},
        {title: '文字链', type: 'link', child: [
          {title: '文字链接', name: 'ss-link-primary'},
          {title: '下划画', name: 'ss-link ss-hover-underline'},
        ]},
      ]
    },
    
    // onLoad(options){
    //   console.log(options, '======= onLoad options');
    //   // let $file = this.getData().file
    //   // let file = options.file
    //   // if (file && file !== $file) {
    //   //   this.setData({ file })
    //   // }
    // },

    // onUnload(){
    //   console.log('====== unload a');
    // },
    onBtnLoad(e, params, inst) {
      const type = params.type
      inst.showLoad()
      setTimeout(() => {
        inst.hideLoad()
      }, 500);
    },
    onReady(){
      this.setData({
        file: ''
      })
    }
  })
}