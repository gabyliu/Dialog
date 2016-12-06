React版弹框

### 将会这样test
![示例][1]

### 组件配置
```
{
                extendClassName: 'myDialog',//string, 扩展class
                title: '我的弹窗标题',//string，弹框标题
                content: '我的弹窗内容',//string, 弹框内容
                id: 'myDialog',
                handle: this.handleDialog//object, 接收弹框点击事件
            }
```

### 组件返回
点击弹窗的确定时返回，返回object
```
{
    id: v.id,//弹窗中按钮的id，取消按钮id为dialog_btn_cancel，确定按钮id为dialog_btn_sure
    dialogId: this.props.data.id//弹窗id，也就是配置中的id
        }
```

### 有哪些功能
1. 自定义弹框内容
![content][2]

2. 自定义控制弹窗是否出现
```
//弹窗是否显示由父元素控制，以这种形式
{this.state.isShowDialog ? <Dialog data={this.state.Dialog} /> : null}
```

3. 组件返回
```
{
    id: v.id,//弹窗中按钮的id，取消按钮id为dialog_btn_cancel，确定按钮id为dialog_btn_sure
    dialogId: this.props.data.id//弹窗id，也就是配置中的id
}
```
![content][3]

  [1]: http://mmbiz.qpic.cn/mmemoticon/Q3auHgzwzM51nY8IaV38khsQI9yL8JaMCekD8wa8aUicnWYic3ibibrxUQlDEAAW9Ufic/0
  [2]: http://mmbiz.qpic.cn/mmemoticon/Q3auHgzwzM6Mc3PlejPjtxribRFBhAWhm0ZD13VAm3cfpibiaicVV9dWWbSyWibMgeMYb/0
  [3]: http://mmbiz.qpic.cn/mmemoticon/Q3auHgzwzM4WjOpz7KyZ1ehFUj0ictPMcxg24DHVDZ82EN8oyCtK3wy9OorsYDVG9/0