webpackJsonp([11],{C6PY:function(e,t,a){var n=a("ze61");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("e669b5b2",n,!0,{})},xje1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),i=a("Au9i"),o={name:"",components:{},data:function(){return{getReportData:"",TESTFLAG:this.GLOBAL_CONFIG.TESTFLAG,LOGFLAG:this.GLOBAL_CONFIG.LOGFLAG,testDeep:this.GLOBAL_CONFIG.TESTDEEPTH,ONLY_CONNECT_STATUS_TOAST:this.GLOBAL_CONFIG.ONLY_CONNECT_STATUS_TOAST,secdTime:this.GLOBAL_CONFIG.autoRouterTime/1e3,gowelding:!1,testModel:0,rizhiList:this.$store.state.rizhiList}},methods:{copyArticle:function(){var e=document.createElement("input");e.value=s()(this.rizhiList),document.body.appendChild(e),e.select(),e.setSelectionRange(0,e.value.length),document.execCommand("Copy"),document.body.removeChild(e),console.log("复制成功")},copyPsd:function(){var e=document.getElementById("psd");this.navigatorCopy(e,"#psd")},navigatorCopy:function(e,t){if(navigator.userAgent.indexOf("Android")>-1){var a=e;console.log(a),a.select(),document.execCommand("Copy"),alert("复制成功")}if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){var n=document.querySelector(t);console.log(n);var s=document.createRange();s.selectNode(n),window.getSelection().addRange(s);var i=document.execCommand("copy");try{alert(i?"复制成功！":"复制失败")}catch(e){alert("复制失败!")}window.getSelection().removeAllRanges()}},copyUrl:function(){var e=document.createRange();e.selectNode(document.querySelector(".copyObj"));var t=window.getSelection();t.rangeCount>0&&t.removeAllRanges(),t.addRange(e),document.execCommand("Copy"),Object(i.Toast)({message:"日志复制成功，共"+this.rizhiList.length+"条",position:"middle",iconClass:"icon icon-success",duration:1500})},goback:function(){this.$store.state.rizhiListFlag=!0,this.$router.go(-1)},changeTestFlag:function(e){this.$Message.info("Changed:"+e),this.$store.state.testModalDoorFlag=e,this.GLOBAL_CONFIG.TESTFLAG=e},changeLogFlag:function(e){this.$Message.info("Changed:"+e),this.GLOBAL_CONFIG.LOGFLAG=e},changeConnectStatusFlag:function(e){this.$Message.info("Changed:"+e),this.GLOBAL_CONFIG.ONLY_CONNECT_STATUS_TOAST=e},changeConnectWeldingStatusFlag:function(e){var t=this;this.gowelding=e,this.gowelding&&setTimeout(function(){t.buildData("newIndex",t.GLOBAL_CONFIG.callWeldTypeData.migsyn.crcCode,"dae1 20 00 00 00 02 00 003C 003D 00b4 00c8 02 09 5952".replace(/\s+/g,"").replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,"")),t.buildWeldingData("DAB1 0000 0000 1A58")},2e3)},choose:function(e){this.testDeep=e,this.GLOBAL_CONFIG.TESTDEEPTH=e},choosem:function(e){var t=this;this.testModel=e;var a="";switch(e){case 0:a="DAB1 0000 0000 1A58",this.buildData("newIndex",this.GLOBAL_CONFIG.callWeldTypeData.migsyn.crcCode,"dae1 20 00 00 00 02 00 003C 003D 00b4 00c8 02 09 5952".replace(/\s+/g,"").replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,""));break;case 1:a="DAB2 0000 0000 1A1C",this.buildData("newIndex",this.GLOBAL_CONFIG.callWeldTypeData.migman.crcCode,"dae2 20 003D 00c8 00 6283".replace(/\s+/g,"").replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,""));break;case 2:a="DAB3 0000 0000 DA21",this.buildData("newIndex",this.GLOBAL_CONFIG.callWeldTypeData.tigsyn.crcCode,"dae3 20 00 03 0064 0064 02 09  8C75".replace(/\s+/g,"").replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,""));break;case 3:a="DAB4 0000 0000 1A94",this.buildData("newIndex",this.GLOBAL_CONFIG.callWeldTypeData.tigman.crcCode,"dae4 20 c0 32 0032 32 0032 0032 03e8 32 32 0032 32 50 23 4CCA".replace(/\s+/g,"").replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,""));break;case 4:a="DAB5 0000 0000 DAA9",this.buildData("newIndex",this.GLOBAL_CONFIG.callWeldTypeData.mma.crcCode,"dae5 20 00 01 09 0064 0064 C54A".replace(/\s+/g,"").replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,""))}setTimeout(function(){t.buildWeldingData(a)},2e3)},buildWeldingData:function(e){var t=(e=e.replace(/\s+/g,"").toUpperCase()).substring(e.length-4,e.length+1);if(16==e.length&&t==this.crcModelBusClacQuery(e.substring(2,e.length-4),!0)){switch(this.GLOBAL_CONFIG.TESTFLAG||("env_ios"==this.envType?this.callSendDataToBleUtil("newIndex","DAFF"+t+this.crcModelBusClacQuery("FF"+t,!0),t):window.android.callSendDataToBle("newIndex","DAFF"+t+this.crcModelBusClacQuery("FF"+t,!0),t)),this.$store.state.getWeldingInfoTimes=this.$store.state.getWeldingInfoTimes?this.$store.state.getWeldingInfoTimes:1,e.substring(2,4)){case"B1":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.migsyn,this.$store.state.weldingCur=parseInt(e.substring(4,8),16),this.$store.state.weldingVoltage=parseInt(e.substring(8,12),16);break;case"B2":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.migman,this.$store.state.weldingCur=parseInt(e.substring(4,8),16),this.$store.state.weldingVoltage=parseInt(e.substring(8,12),16);break;case"B3":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.tigsyn,this.$store.state.weldingCur=parseInt(e.substring(4,8),16),this.$store.state.weldingVoltage=parseInt(e.substring(8,12),16);break;case"B4":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.tigman,this.$store.state.weldingCur=parseInt(e.substring(4,8),16),this.$store.state.weldingVoltage=parseInt(e.substring(8,12),16);break;case"B5":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.mma,this.$store.state.weldingCur=parseInt(e.substring(4,8),16),this.$store.state.weldingVoltage=parseInt(e.substring(8,12),16)}console.log("this.$store.state.getWeldingInfoTime"+this.$store.state.getWeldingInfoTime),1==this.$store.state.getWeldingInfoTimes&&"{}"!=s()(this.$store.state.rstInfo)&&(console.log("this.$store.state.rstInfo.initBean.weldStatus"+this.$store.state.rstInfo.initBean.weldStatus),1==this.$store.state.weldingStatus&&this.$router.push("/welding"))}}},mounted:function(){this.$store.state.rizhiListFlag=!1},created:function(){},computed:{envType:function(){return this.$store.state.envType}},destroyed:function(){this.$store.state.rizhiListFlag=!0},watch:{secdTime:function(){this.GLOBAL_CONFIG.autoRouterTime=1e3*this.secdTime},getReportData:function(){return this.$store.state.oldBroastData}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"developerManage"},[a("div",{staticClass:"contain"},[a("ul",{staticClass:"d-ul"},[a("li",{staticClass:"d-li"},[a("div",{staticClass:"lf"},[e._v("体验者模式开关")]),e._v(" "),a("div",{staticClass:"rt"},[a("i-switch",{attrs:{value:e.TESTFLAG,size:"large"},on:{"on-change":e.changeTestFlag}},[a("span",{attrs:{slot:"open"},slot:"open"},[e._v("ON")]),e._v(" "),a("span",{attrs:{slot:"close"},slot:"close"},[e._v("OFF")])])],1)]),e._v(" "),a("li",{staticClass:"d-li"},[a("div",{staticClass:"lf"},[e._v("日志开关")]),e._v(" "),a("div",{staticClass:"rt"},[a("i-switch",{attrs:{value:e.LOGFLAG,size:"large"},on:{"on-change":e.changeLogFlag}},[a("span",{attrs:{slot:"open"},slot:"open"},[e._v("ON")]),e._v(" "),a("span",{attrs:{slot:"close"},slot:"close"},[e._v("OFF")])])],1)]),e._v(" "),a("li",{staticClass:"d-li"},[a("div",{staticClass:"lf"},[e._v("连接状态")]),e._v(" "),a("div",{staticClass:"rt"},[a("i-switch",{attrs:{value:e.ONLY_CONNECT_STATUS_TOAST,size:"large"},on:{"on-change":e.changeConnectStatusFlag}},[a("span",{attrs:{slot:"open"},slot:"open"},[e._v("ON")]),e._v(" "),a("span",{attrs:{slot:"close"},slot:"close"},[e._v("OFF")])])],1)]),e._v(" "),a("li",{staticClass:"d-li"},[a("div",{staticClass:"lf"},[e._v("测试设置")]),e._v(" "),a("div",{staticClass:"rt"},[a("div",{staticClass:"t-li",class:0==e.testDeep?"choosed":"",on:{click:function(t){e.choose(0)}}},[e._v("0")]),e._v(" "),a("div",{staticClass:"t-li",class:1==e.testDeep?"choosed":"",on:{click:function(t){e.choose(1)}}},[e._v("1")]),e._v(" "),a("div",{staticClass:"t-li",class:2==e.testDeep?"choosed":"",on:{click:function(t){e.choose(2)}}},[e._v("2")])])]),e._v(" "),a("li",{staticClass:"d-li two"},[a("div",{staticClass:"lf"},[e._v("模拟焊接中的状态")]),e._v(" "),a("div",{staticClass:"rt"},[a("div",{staticClass:"t-li",class:0==e.testModel?"choosed":"",on:{click:function(t){e.choosem(0)}}},[e._v("migsyn")]),e._v(" "),a("div",{staticClass:"t-li",class:1==e.testModel?"choosed":"",on:{click:function(t){e.choosem(1)}}},[e._v("migman")]),e._v(" "),a("div",{staticClass:"t-li",class:2==e.testModel?"choosed":"",on:{click:function(t){e.choosem(2)}}},[e._v("tigsyn")]),e._v(" "),a("div",{staticClass:"t-li",class:3==e.testModel?"choosed":"",on:{click:function(t){e.choosem(3)}}},[e._v("tigman")]),e._v(" "),a("div",{staticClass:"t-li",class:4==e.testModel?"choosed":"",on:{click:function(t){e.choosem(4)}}},[e._v("mma")])])]),e._v(" "),a("li",{staticClass:"d-li"},[a("div",{staticClass:"lf"},[e._v("前往焊接中")]),e._v(" "),a("div",{staticClass:"rt"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.secdTime,expression:"secdTime"}],staticClass:"secd",attrs:{type:"number",min:"1",max:"20"},domProps:{value:e.secdTime},on:{input:function(t){t.target.composing||(e.secdTime=t.target.value)}}}),e._v("s\n                ")])]),e._v(" "),e._m(0),e._v(" "),a("li",{staticClass:"d-li",on:{click:function(t){e.copyArticle()}}},[a("div",{staticClass:"lf"},[e._v("点击复制log")])]),e._v(" "),a("li",e._l(e.rizhiList,function(t,n){return a("div",{key:n,staticClass:"rizhi"},[e._v("\n                    "+e._s(t.sendTime)+":"+e._s(t.bleReponseData)+"\n                ")])}))]),e._v(" "),a("div",[e._v("\n           "+e._s(e.getReportData)+"\n       ")])]),e._v(" "),a("div",{staticClass:"goback",on:{click:e.goback}},[e._v("\n            BACK\n    ")])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"d-li"},[t("div",{staticClass:"lf"},[this._v("接收的报文")])])}]};var c=a("VU/8")(o,l,!1,function(e){a("C6PY")},"data-v-315629ba",null);t.default=c.exports},ze61:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"\n.developerManage[data-v-315629ba] {\n  height: 100%;\n  width: 100%;\n  background: #39abfd;\n  display: inline-block;\n}\n.developerManage .contain[data-v-315629ba] {\n    margin-top: 20px;\n}\n.developerManage .contain .d-ul[data-v-315629ba] {\n      height: auto;\n      margin: 0 10px;\n}\n.developerManage .contain .d-ul .d-li[data-v-315629ba] {\n        background: #fff;\n        color: #000;\n        height: 50px;\n        line-height: 50px;\n        margin: 5px 0;\n        padding: 0 15px;\n        zoom: 1;\n}\n.developerManage .contain .d-ul .d-li .lf[data-v-315629ba] {\n          width: 35%;\n          font-size: 14px;\n          float: left;\n}\n.developerManage .contain .d-ul .d-li .rt[data-v-315629ba] {\n          width: 65%;\n          float: right;\n          text-align: right;\n          text-align: center;\n          font-size: 20px;\n}\n.developerManage .contain .d-ul .d-li .rt .t-li[data-v-315629ba] {\n            margin-right: 5px;\n            width: 60px;\n            border: 1px dashed #999;\n            float: left;\n}\n.developerManage .contain .d-ul .d-li .rt .choosed[data-v-315629ba] {\n            background: #39abfd;\n}\n.developerManage .contain .d-ul .d-li .rt .secd[data-v-315629ba] {\n            text-align: center;\n            background: #eee;\n            height: 45px;\n            line-height: 45px;\n}\n.developerManage .contain .d-ul .two[data-v-315629ba] {\n        height: 120px;\n}\n.developerManage .contain .d-ul .rizhi[data-v-315629ba] {\n        padding: 5px 0;\n}\n.developerManage .goback[data-v-315629ba] {\n    margin-top: 180px;\n    margin-left: 40px;\n    margin-right: 40px;\n    margin-bottom: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    font-size: 16px;\n    background: #010101;\n    color: #fff;\n}\n","",{version:3,sources:["/Users/lijiangyong/lijiangyong/Documents/a_wtl/混合开发用www_ios/www/src/pages/setting/develeperManage.vue"],names:[],mappings:";AACA;EACE,aAAa;EACb,YAAY;EACZ,oBAAoB;EACpB,sBAAsB;CACvB;AACD;IACI,iBAAiB;CACpB;AACD;MACM,aAAa;MACb,eAAe;CACpB;AACD;QACQ,iBAAiB;QACjB,YAAY;QACZ,aAAa;QACb,kBAAkB;QAClB,cAAc;QACd,gBAAgB;QAChB,QAAQ;CACf;AACD;UACU,WAAW;UACX,gBAAgB;UAChB,YAAY;CACrB;AACD;UACU,WAAW;UACX,aAAa;UACb,kBAAkB;UAClB,mBAAmB;UACnB,gBAAgB;CACzB;AACD;YACY,kBAAkB;YAClB,YAAY;YACZ,wBAAwB;YACxB,YAAY;CACvB;AACD;YACY,oBAAoB;CAC/B;AACD;YACY,mBAAmB;YACnB,iBAAiB;YACjB,aAAa;YACb,kBAAkB;CAC7B;AACD;QACQ,cAAc;CACrB;AACD;QACQ,eAAe;CACtB;AACD;IACI,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;IACnB,oBAAoB;IACpB,aAAa;IACb,kBAAkB;IAClB,mBAAmB;IACnB,gBAAgB;IAChB,oBAAoB;IACpB,YAAY;CACf",file:"develeperManage.vue",sourcesContent:["\n.developerManage[data-v-315629ba] {\n  height: 100%;\n  width: 100%;\n  background: #39abfd;\n  display: inline-block;\n}\n.developerManage .contain[data-v-315629ba] {\n    margin-top: 20px;\n}\n.developerManage .contain .d-ul[data-v-315629ba] {\n      height: auto;\n      margin: 0 10px;\n}\n.developerManage .contain .d-ul .d-li[data-v-315629ba] {\n        background: #fff;\n        color: #000;\n        height: 50px;\n        line-height: 50px;\n        margin: 5px 0;\n        padding: 0 15px;\n        zoom: 1;\n}\n.developerManage .contain .d-ul .d-li .lf[data-v-315629ba] {\n          width: 35%;\n          font-size: 14px;\n          float: left;\n}\n.developerManage .contain .d-ul .d-li .rt[data-v-315629ba] {\n          width: 65%;\n          float: right;\n          text-align: right;\n          text-align: center;\n          font-size: 20px;\n}\n.developerManage .contain .d-ul .d-li .rt .t-li[data-v-315629ba] {\n            margin-right: 5px;\n            width: 60px;\n            border: 1px dashed #999;\n            float: left;\n}\n.developerManage .contain .d-ul .d-li .rt .choosed[data-v-315629ba] {\n            background: #39abfd;\n}\n.developerManage .contain .d-ul .d-li .rt .secd[data-v-315629ba] {\n            text-align: center;\n            background: #eee;\n            height: 45px;\n            line-height: 45px;\n}\n.developerManage .contain .d-ul .two[data-v-315629ba] {\n        height: 120px;\n}\n.developerManage .contain .d-ul .rizhi[data-v-315629ba] {\n        padding: 5px 0;\n}\n.developerManage .goback[data-v-315629ba] {\n    margin-top: 180px;\n    margin-left: 40px;\n    margin-right: 40px;\n    margin-bottom: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    font-size: 16px;\n    background: #010101;\n    color: #fff;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=11.d7ed2b409840fe5d620e.js.map