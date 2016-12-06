//按钮
var Btn = React.createClass({
    handleClick: function(e){
        e.stopPropagation();
        this.props.data.handle({
            id: this.props.data.id
        });
    },
    render: function(){
        var classNameBtn = typeof this.props.data.classname != 'undefined' ? 'btn ' + this.props.data.classname : 'btn',
            hrefBtn = typeof this.props.data.href != 'undefined' ? this.props.data.href : 'javascript:;';
        return (
            <a onClick={this.handleClick} href={hrefBtn} className={classNameBtn}>{this.props.data.text}</a>
        )
    }
});

//dialog
/*
extendClassName: ,//string, 扩展class
title: ,//string，弹框标题
content: ,//string, 弹框内容
handle: ,//object, 接收弹框点击事件
*/
var Dialog = React.createClass({
    getInitialState: function(){
        return {
            btn_sure: {
                id: 'dialog_btn_sure', //必填，string，触发事件时会返回
                classname: 'btn_primary',//选填，string，扩展的className
                text: '确定',//必填，string，按钮文案
                handle: this.handleClick//必填，object，点击时触发的事件
            },
            btn_cancel: {
                id: 'dialog_btn_cancel', //必填，string，触发事件时会返回
                classname: 'btn_default',//选填，string，扩展的className
                text: '取消',//必填，string，按钮文案
                handle: this.handleClick//必填，object，点击时触发的事件
            }
        }
    },
    handleClick: function(v){
        this.props.data.handle({
            id: v.id,
            dialogId: this.props.data.id
        });
    },
    render: function(){
        var className = 'dialog ' + this.props.data.extendClassName;
            
        return (
            <div className="dialog_mask">
                <div className={className}>
                    {this.props.data.title ? <div className="dialog_head">{this.props.data.title}</div> : null}
                    <div className="dialog_content">
                        {this.props.data.content}
                    </div>
                    
                    <div className="dialog_ft">
                        <Btn data={this.state.btn_cancel} />
                        <Btn data={this.state.btn_sure} />
                    </div>
                </div>
            </div>
        )
    }
});

var Inner = React.createClass({
    getInitialState: function(){
        return {
            btnShowDialog: {
                id: 'btn_show_dialog', //必填，string，触发事件时会返回
                classname: 'btn_primary',//选填，string，扩展的className
                text: '点击出弹框',//必填，string，按钮文案
                handle: this.handleClick//
            },
            //dialog配置
            Dialog: {
                extendClassName: 'myDialog',//string, 扩展class
                title: '我的弹窗标题',//string，弹框标题
                content: '我的弹窗内容',//string, 弹框内容
                id: 'myDialog',
                handle: this.handleDialog//object, 接收弹框点击事件
            },
            //dialog配置 end
            isShowDialog: false,//dialog是否出现
            resultDialog: ''
        }

    },
    handleClick: function(){
        this.setState({
            isShowDialog: true
        });
    },  
    handleDialog: function(e){
        switch(e.id){
            case 'dialog_btn_cancel':
                this.setState({
                    isShowDialog: false//隐藏弹框
                });
                break;
        }
        this.setState({
            resultDialog: JSON.stringify(e)
        });

    },
    render: function(){
        return (
            <div className="container">
                <Btn data={this.state.btnShowDialog} />
                {this.state.isShowDialog ? <Dialog data={this.state.Dialog} /> : null}
                
                <div>
                    {this.state.resultDialog}
                </div>
            </div>
        )
    }
});
React.render(
    <Inner />,
    document.getElementById('inner')
);