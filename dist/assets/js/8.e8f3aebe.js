(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{13:function(t,e,a){},23:function(t,e,a){"use strict";var s=a(13);a.n(s).a},28:function(t,e,a){"use strict";a.r(e);a(29),a(41),a(44);var s={name:"item",props:["itemData"],methods:{getUserPortraitURL:function(t){var e=t&&t.match("default_([0-9]+).jpg"),a=e&&e[1];return"https://new-towords.oss-cn-beijing.aliyuncs.com/img/public_portrait/avatar_"+(a||"01")+".png"},formatDate:function(t){if(!t)return"";var e=new Date(t),a=new Date,s=function(t){return t instanceof Date||(t=new Date(t)),Number(t)/1e3};if(t=t.replace(/-/g,(function(){return"/"})),a.getFullYear()===e.getFullYear()){var i=s(a)-s(e);return i<60?"刚刚":i<3600?Math.floor(i/60)+"分钟前":i<86400?Math.floor(i/3600)+"小时前":i<172800?"昨天 "+(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes():e.getMonth()+1+"月"+e.getDate()+"日 "+(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()}return e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日 "+(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()}},data:function(){return{}}},i=(a(23),a(1)),n=Object(i.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.itemData?a("div",{staticClass:"experience"},[a("div",{staticClass:"person__info"},[a("div",{staticClass:"l"},[a("div",{staticClass:"avatar"},[a("img",{staticClass:"img logo goto",attrs:{src:t.getUserPortraitURL(t.itemData.userPortrait),alt:"avatar"}})])]),t._v(" "),a("div",{staticClass:"m"},[a("div",{staticClass:"name"},[t._v(t._s(t.itemData.userName)+" "),t.itemData.vipStatus?a("span",{staticClass:"vip__icon"}):t._e()]),t._v(" "),a("div",[t.itemData.groupName?a("div",{staticClass:"tgroups"},[a("span",[t._v(t._s(t.itemData.groupName))])]):t._e(),t._v(" "),a("div",{staticClass:"time"},[t._v(t._s(t.formatDate(t.itemData.createTime)))]),t._v(" "),a("div",{staticClass:"slim"},[t._v("精选")])])]),t._v(" "),t._m(0)]),t._v(" "),a("p",{staticClass:"experience__content"},[t._v(t._s(t.itemData.content))]),t._v(" "),a("p",{staticClass:"experience__topics"},t._l(t.itemData.rdmExperienceTopicInfoList,(function(e,s){return a("span",{key:s,staticClass:"topic"},[a("b",{staticClass:"topic__icon"}),t._v(t._s(e.topicDescription))])})),0),t._v(" "),a("div",{staticClass:"experience__footer"},[t._m(1),t._v(" "),a("p",{staticClass:"btn"},[a("span",{staticClass:"icon comment"}),t._v(" "+t._s(t.itemData.commentNum?t.itemData.commentNum:"评论 "))]),t._v(" "),a("p",{staticClass:"btn"},[a("span",{staticClass:"icon like"}),t._v(t._s(t.itemData.praiseNum?t.itemData.praiseNum:"点赞 ")+" ")])])]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"r"},[e("div",{staticClass:"person__attention--not"},[this._v("+关注")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"btn"},[e("span",{staticClass:"icon share"}),this._v(" 分享 ")])}],!1,null,"d205b99c",null);e.default=n.exports}}]);