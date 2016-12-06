//按钮
var Btn = React.createClass({displayName: "Btn",
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
            React.createElement("a", {onClick: this.handleClick, href: hrefBtn, className: classNameBtn}, this.props.data.text)
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
var Dialog = React.createClass({displayName: "Dialog",
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
            React.createElement("div", {className: "dialog_mask"}, 
                React.createElement("div", {className: className}, 
                    this.props.data.title ? React.createElement("div", {className: "dialog_head"}, this.props.data.title) : null, 
                    React.createElement("div", {className: "dialog_content"}, 
                        this.props.data.content
                    ), 
                    
                    React.createElement("div", {className: "dialog_ft"}, 
                        React.createElement(Btn, {data: this.state.btn_cancel}), 
                        React.createElement(Btn, {data: this.state.btn_sure})
                    )
                )
            )
        )
    }
});

var Inner = React.createClass({displayName: "Inner",
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
            React.createElement("div", {className: "container"}, 
                React.createElement(Btn, {data: this.state.btnShowDialog}), 
                this.state.isShowDialog ? React.createElement(Dialog, {data: this.state.Dialog}) : null, 
                
                React.createElement("div", null, 
                    this.state.resultDialog
                )
            )
        )
    }
});
React.render(
    React.createElement(Inner, null),
    document.getElementById('inner')
);