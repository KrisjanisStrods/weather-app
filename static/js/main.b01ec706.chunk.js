(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],{12:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(6),i=n.n(c),s=(n(12),n(2)),o=n(0);function u(e){var t=e.temp,n=void 0===t?"N/A":t,r=e.hour,a=r>=0&&r<=23?"".concat(r,":00"):"N/A";return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{className:"temperature-by-hour",children:[Object(o.jsxs)("div",{children:[n,"\xb0C"]}),Object(o.jsx)("div",{className:"hour",children:a})]}),Object(o.jsx)("div",{className:"temperature-spacer"})]})}var d=function(e){var t=e.day,n=e.dayTemp,a=e.nightTemp,c=e.avgHumidity,i=e.tempByHour,d=void 0===i?[]:i,l=Object(r.useState)(!1),h=Object(s.a)(l,2),p=h[0],m=h[1];return Object(o.jsxs)("div",{className:p?"collapsible-card show":"collapsible-card",children:[Object(o.jsxs)("div",{className:"card-row light",onClick:function(){return m((function(e){return!e}))},children:[Object(o.jsx)("div",{className:"row-title",children:t}),Object(o.jsx)("div",{className:"row-body",children:Object(o.jsxs)("div",{className:"general-info",children:[Object(o.jsxs)("div",{children:[Object(o.jsxs)("span",{className:"day-temperature",children:[n,"\xb0C"]}),Object(o.jsxs)("span",{className:"night-temperature",children:[" / ",a,"\xb0C"]})]}),Object(o.jsxs)("div",{className:"humidity",children:["Avg. Humidity: ",c,"%"]})]})}),Object(o.jsx)("div",{className:"row-body-spacer"}),Object(o.jsx)("div",{className:"row-misc",children:Object(o.jsx)("span",{className:p?"collapse-icon up":"collapse-icon",children:"\u25bc"})})]}),Object(o.jsxs)("div",{className:"card-row",children:[Object(o.jsx)("div",{className:"row-title"}),d.map((function(e){var t=e.temp,n=e.hour;return Object(o.jsx)(u,{temp:t,hour:n})})),Object(o.jsx)("div",{className:"temperature-spacer-end"})]})]})},l=n(4),h=n.n(l),p=n(7),m=n(5),j=Object({NODE_ENV:"production",PUBLIC_URL:"/weather-app",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_KEY:"49753d5f007133494f638f79936e6311",REACT_APP_DEFAULT_LAT:"56.8959822",REACT_APP_DEFAULT_LON:"24.2258253"}),g=j.REACT_APP_API_KEY,v=j.REACT_APP_DEFAULT_LAT,O=j.REACT_APP_DEFAULT_LON,b=[0,5,6,11,12,17,18,23];function f(e){return{hour:new Date(1e3*e.dt).getHours(),temp:Math.round(e.main.temp),humidity:e.main.humidity}}function T(e){return{day:{1:"MONDAY",2:"TUESDAY",3:"WEDNESDAY",4:"THURSDAY",5:"FRIDAY",6:"SATURDAY",7:"SUNDAY"}[new Date(1e3*e.dt).getDay()],recurring:[f(e)]}}function A(){for(var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=[],r=0;r<t.length;r++){var a=t[r],c=new Date(1e3*a.dt).getDay();c===e?n[n.length-1].recurring.push(f(a)):(n.push(T(a)),e=c)}return n}function y(e){return Math.round(e.reduce((function(e,t){return e+t}),0)/e.length)}function N(e){return e.map((function(e){var t=e.recurring.reduce((function(e,t){var n=t.hour,r=t.temp,a=t.humidity;return n>=8&&n<=18?e.dayTemperatures.push(r):e.nightTemperatures.push(r),e.humidity.push(a),e}),{dayTemperatures:[],nightTemperatures:[],humidity:[]}),n=t.dayTemperatures,r=t.nightTemperatures,a=t.humidity;return Object(m.a)(Object(m.a)({},e),{},{averageDayTemp:n.length>0?y(n):"N/A",averageNightTemp:r.length>0?y(r):"N/A",averageHumidity:a.length>0?y(a):"N/A",recurring:e.recurring.filter((function(e){return b.includes(e.hour)}))})}))}function x(){return(x=Object(p.a)(h.a.mark((function e(t){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new Promise((function(e,t){return navigator.geolocation.getCurrentPosition(e,t)}));case 3:r=e.sent,n={lat:r.coords.latitude,lon:r.coords.longitude},e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0.message),n={lat:v,lon:O};case 11:window.fetch("http://api.openweathermap.org/data/2.5/forecast?lat=".concat(n.lat,"&lon=").concat(n.lon,"&appid=").concat(g,"&units=metric")).then((function(e){return e.json()})).then((function(e){var n=A(e.list),r=N(n);console.log(" data.list",n),t(r)}));case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}n(15);function _(e){var t=e.data;return console.log(t),t.length>0?t.map((function(e){var t=e.day,n=e.averageDayTemp,r=e.averageNightTemp,a=e.averageHumidity,c=e.recurring;return Object(o.jsx)(d,{day:t,dayTemp:n,nightTemp:r,avgHumidity:a,tempByHour:c})})):Object(o.jsx)("h1",{children:"Oops. Something went wrong."})}var w=function(){var e=Object(r.useState)(),t=Object(s.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){!function(e){x.apply(this,arguments)}((function(e){return a(e)}))}),[]),Object(o.jsx)("div",{className:"main-wrapper",children:n?Object(o.jsx)(_,{data:n}):Object(o.jsx)("div",{className:"loading",children:"...acquiring location"})})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};i.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(w,{})}),document.getElementById("root")),D()}},[[16,1,2]]]);
//# sourceMappingURL=main.b01ec706.chunk.js.map