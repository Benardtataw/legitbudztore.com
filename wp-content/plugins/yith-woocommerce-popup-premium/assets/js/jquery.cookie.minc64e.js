(function(h){if("function"===typeof define&&define.amd)define(h);else if("object"===typeof exports)module.exports=h();else{var l=window.Cookies,f=window.Cookies=h(window.jQuery);f.noConflict=function(){window.Cookies=l;return f}}})(function(){function h(){for(var f=0,b={};f<arguments.length;f++){var a=arguments[f],c;for(c in a)b[c]=a[c]}return b}function l(f){function b(a,c,e){var g;if(1<arguments.length){e=h({path:"/"},b.defaults,e);if("number"===typeof e.expires){var k=new Date;k.setMilliseconds(k.getMilliseconds()+
864E5*e.expires);e.expires=k}try{g=JSON.stringify(c),/^[\{\[]/.test(g)&&(c=g)}catch(l){}c=encodeURIComponent(String(c));c=c.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);a=encodeURIComponent(String(a));a=a.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);a=a.replace(/[\(\)]/g,escape);return document.cookie=[a,"=",c,e.expires&&"; expires="+e.expires.toUTCString(),e.path&&"; path="+e.path,e.domain&&"; domain="+e.domain,e.secure&&"; secure"].join("")}a||
(g={});for(var k=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,m=0;m<k.length;m++){var d=k[m].split("="),n=d[0].replace(p,decodeURIComponent),d=d.slice(1).join("=");'"'===d.charAt(0)&&(d=d.slice(1,-1));d=f&&f(d,n)||d.replace(p,decodeURIComponent);if(this.json)try{d=JSON.parse(d)}catch(q){}if(a===n){g=d;break}a||(g[n]=d)}return g}b.get=b.set=b;b.getJSON=function(){return b.apply({json:!0},[].slice.call(arguments))};b.defaults={};b.remove=function(a,c){b(a,"",h(c,{expires:-1}))};
b.withConverter=l;return b}return l()});