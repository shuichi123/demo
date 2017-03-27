/**
 * Created by Administrator on 2017/3/23 0023.
 */

//addLoadEvent函数
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }
    else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

//跨浏览器事件绑定函数addFuc
function addFuc(ele,event,listener){
    if(ele.addEventListener){
        ele.addEventListener(event,listener,false);
    }
    else if(ele.attachEvent){
        ele.attachEvent("on"+event,listener);
    }
    else{
        ele["on"+event] = listener;
    }
}

//判断元素ele是否有className
function hasClass(ele,className){
    var list = ele.className.split(/\s+/);
    for(var i=0; i<list.length; i++){
        if(list[i] == className){
            return true;
        }
    }
    return false;
}

//给元素ele增加一个className
function addClass(ele,className){
    var list = ele.className.split(/\s+/);
    if(!list[0]){
        ele.className = className;
    }
    else{
        ele.className += " " + className;
    }
}

//移除元素ele的className
function removeClass(ele,className){
    var list = ele.className.split(/\s+/);
    if(!list[0]) return;
    for(var i=0; i<list.length; i++){
        if(list[i] == className){
            list.splice(i, 1);
            ele.className = list.join(" ");
        }
    }
}

//通过class获取DOM节点
function getElementsByClassName(element,names){
    if(element.getElementsByClassName){
        return element.getElementsByClassName(names);
    }
    else{
        var list = element.childNodes,
            new_list = [],
            len = list.length;
        for(var i = 0;i<len;i++){
            if(list[i].nodeType == 1 && list[i].getAttribute("class")){
                var arr = list[i].getAttribute("class").split(" "),
                    names_arr = names.split(" "),
                    count = 0;
                for(var j = 0;j<names_arr.length;j++){
                    for(var n = 0;n<arr.length;n++){
                        if(names_arr[j] === arr[n]){
                            count++;
                            if(count == names_arr.length){
                                new_list.push(list[i]);
                            }
                        }
                    }
                }

            }
        }
        return new_list;
    }
}

//设置cookie
function setCookie(name, value, days){
    var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value),
        exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    cookie += ("; expires=" + exp.toGMTString());
    document.cookie = cookie;
}

//获取cookie
function getCookie(){
    var cookie = {},
        all = document.cookie;
    if(all === "") return cookie;
    var list = all.split("; ");
    for(var i=0; i<list.length; i++){
        var item = list[i],
            p = item.indexOf("="),
            name = item.substring(0,p),
            value = item.substring(p+1);
        name = decodeURIComponent(name);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}

//ajax 方法
function ajax(url,data,method,success,error){
    var req = new XMLHttpRequest(),
        data = data || {},
        method = method || "get",
        success = success || function(){},
        error = error || function(f){alert(url+"发生错误！")},
        resA = "";
    //在send前重置onreadystatechange方法，否则会出现新的同步请求会执行两次成功回调
    req.onreadystatechange = function(){
        if(req.readyState == 4){
            if(req.status >= 200 && req.status < 300 || req.status == 304 || req.status == 0){
                success && success(req.responseText);
            }
            else{
                error && error(req.status);
            }
        }
    };
    if(data){
        var resB = [];
        for(var i in data){
            resB.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
        }
        resA = resB.join("&");
    }
    if(method === "get"){
        if(data){
            url += "?" + resA;
        }
        req.open(method,url,true);
        req.send(null);
    }
    if(method == "post"){
        req.open(method,url,true);
        req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        req.send(resA);
    }
}

//透明度设置函数
function setOpacity(ele, level){
    if(ele.filter){
        ele.style.filter = "alpha(opacity='+level+')";
    }
    else{
        ele.style.opacity = level/100;
    }
}