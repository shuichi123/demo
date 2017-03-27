/**
 * Created by Administrator on 2017/3/23 0023.
 */

//addLoadEvent����
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

//��������¼��󶨺���addFuc
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

//�ж�Ԫ��ele�Ƿ���className
function hasClass(ele,className){
    var list = ele.className.split(/\s+/);
    for(var i=0; i<list.length; i++){
        if(list[i] == className){
            return true;
        }
    }
    return false;
}

//��Ԫ��ele����һ��className
function addClass(ele,className){
    var list = ele.className.split(/\s+/);
    if(!list[0]){
        ele.className = className;
    }
    else{
        ele.className += " " + className;
    }
}

//�Ƴ�Ԫ��ele��className
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

//ͨ��class��ȡDOM�ڵ�
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

//����cookie
function setCookie(name, value, days){
    var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value),
        exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    cookie += ("; expires=" + exp.toGMTString());
    document.cookie = cookie;
}

//��ȡcookie
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

//ajax ����
function ajax(url,data,method,success,error){
    var req = new XMLHttpRequest(),
        data = data || {},
        method = method || "get",
        success = success || function(){},
        error = error || function(f){alert(url+"��������")},
        resA = "";
    //��sendǰ����onreadystatechange���������������µ�ͬ�������ִ�����γɹ��ص�
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

//͸�������ú���
function setOpacity(ele, level){
    if(ele.filter){
        ele.style.filter = "alpha(opacity='+level+')";
    }
    else{
        ele.style.opacity = level/100;
    }
}