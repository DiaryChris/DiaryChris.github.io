window.onload = function () {
//获得DOM节点
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var passconfirm = document.getElementById('passconfirm');
    var email = document.getElementById('email');
    var check = document.getElementById('check');
    var registerForm = document.getElementById('registerForm');
//绑定事件处理函数
    username.addEventListener('input', usernameRes);
    password.addEventListener('input', passwordRes);
    passconfirm.addEventListener('input', passconfirmRes);
    email.addEventListener('input', emailRes);
    //check.onchange = checkRes;
    registerForm.onsubmit = submitRegister;
//默认首次调用
    usernameRes.apply(username);
    passwordRes.apply(password);
    passconfirmRes.apply(passconfirm);
    emailRes.apply(email);
    //checkRes.apply(check);
};
/**
 * 用户名响应函数
 */
function usernameRes() {
    var value = this.value;
    var res = this.parentNode.getElementsByClassName('res')[0];
    if (!value) {
        res.innerHTML = '请填写一个略带萌意又不失逼格的用户名，如：“大黄”';
    } else if (value.length > 20) {
        res.innerHTML = '长度不能超过20字';
    } else if (value.indexOf('@') !== -1) {
        res.innerHTML = '用户名中不能含有"@"字符';
    } else {
        res.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
    }
}
/**
 * 密码响应函数
 */
function passwordRes() {
    var value = this.value;
    var res = this.parentNode.getElementsByClassName('res')[0];
    var passconfirm = document.getElementById('passconfirm');
    if (!value) {
        res.innerHTML = '请填写一个简单易记的密码，如“hahahaha”';
    } else if (value.length < 6) {
        res.innerHTML = '长度不能少于6字符';
    } else if (value.length > 20) {
        res.innerHTML = '长度不能超过20字符';
    } else {
        res.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
    }
    if (passconfirm.value !== value) {
        passconfirm.parentNode.getElementsByClassName('res')[0].innerHTML = '请重复一遍密码';
    } else {
        passconfirm.parentNode.getElementsByClassName('res')[0].innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
    }
}
/**
 * 密码确认响应函数
 */
function passconfirmRes() {
    var value = this.value;
    var res = this.parentNode.getElementsByClassName('res')[0];
    var password = document.getElementById('password').value;
    if (!value) {
        res.innerHTML = '请重复一遍密码';
    } else if (value !== password) {
        res.innerHTML = '与之前输入不同';
    } else {
        res.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
    }
}
/**
 * 邮箱确认响应函数
 */
function emailRes() {
    var value = this.value;
    var res = this.parentNode.getElementsByClassName('res')[0];
    var match = value.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z]+)+)$/);
    if (!value) {
        res.innerHTML = '请填写你最常用的邮箱';
    } else if (!match) {
        res.innerHTML = '邮箱格式不正确';
    } else {
        res.innerHTML = '<span class="glyphicon glyphicon-ok"></span>';
    }
}
/**
 * checkbox响应函数
 */
//function checkRes() {
//    var checked = this.checked;
//    var submit = document.getElementById('submit');
//    if (!checked) {
//        submit.className = 'disabled';
//        submit.disabled = true;
//        submit.title='请同意条款';
//    } else {
//        submit.className = '';
//        submit.disabled = false;
//        submit.title='';
//    }
//}
/**
 * 提交前最终验证函数
 */
function submitRegister() {
    var res = document.getElementsByClassName('res');
    for (var i = 0; i < res.length; i++) {
        var inRes = res[i].innerHTML;
        if (inRes !== '<span class="glyphicon glyphicon-ok"></span>') {
            alert('未正确填写，请重试');
            return false;
        }
    }
    return true;
}