'use strict';

function getJavaScriptCodeAndRemoveInlineScriptTag(){
    let jsCode = '';
    let scripts = document.documentElement.getElementsByTagName('script');
    let i =scripts.length; 
    while(i--) {        
        let script = scripts[i];
        let src = script.src;
        if(src===""){
            jsCode+=script.innerHTML;
            script.parentNode.removeChild(script);
        }else if(src.split('/').reverse()[0]==="createDemo.js"){ 
            script.parentNode.removeChild(script);
        }else{           
            script.setAttribute("src",src);
        }
    }
    return jsCode;
}

function getCssCode(){
    let cssCode = '';
    let styles = document.documentElement.getElementsByTagName('style');
    let i = styles.length; 
    while(i--) {        
        let style = styles[i];    
        cssCode+=style.innerHTML;
        style.parentNode.removeChild(style);        
    }
    return cssCode;
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("target", "_blank");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
    form.parentNode.removeChild(form);
}

function createAndSendPostQuery(){
    
    let jsCode = getJavaScriptCodeAndRemoveInlineScriptTag();
    
    let btn = document.getElementById("buttonToCreateAndSendPostQuery");
    btn.parentNode.removeChild(btn);   
    
    let htmlCode = document.documentElement.innerHTML.trim();
    
    createButtonForTryDemo();
    
    let cssCode = getCssCode();
    let sampleTitle = document.getElementsByTagName('title')[0].innerHTML;
    
    let params = {
        panel_html : 0,
        html : htmlCode,
        pannel_js : 0,
        js : jsCode,
        panel_css : 0,
        css : cssCode,
        title : sampleTitle,
        description : 'A simple demo of '+sampleTitle+' using Chat.js.',
        wrap : 'b'
        
    };
    let API_URL = 'http://jsfiddle.net/api/post/library/pure/';
    let method = 'post';
    post(API_URL,params,method);
}
function createButtonForTryDemo(){
    let btn = document.createElement("BUTTON");
    let t = document.createTextNode("Try it on JsFiddle");
    btn.appendChild(t);
    btn.setAttribute("id","buttonToCreateAndSendPostQuery");
    btn.setAttribute("onclick","createAndSendPostQuery()");
    document.body.appendChild(btn);
}
createButtonForTryDemo();
