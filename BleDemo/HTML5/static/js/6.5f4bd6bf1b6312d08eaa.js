webpackJsonp([6],{AGFn:function(a,n,e){var t=e("jyeb");"string"==typeof t&&(t=[[a.i,t,""]]),t.locals&&(a.exports=t.locals);e("rjj0")("be9ad970",t,!0,{})},CjWj:function(a,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("mvHQ"),o=e.n(t),i=e("Au9i"),s=e("rUx+"),r=e("Ad3v"),A=(e("IcnI"),{name:"",components:{Loading:s.a,Head:r.a},data:function(){return{pageFrom:"",LoadingTimer:{},isLoading:!1,mList:[{mid:1,remarksTtile:""},{mid:2,remarksTtile:""},{mid:3,remarksTtile:""},{mid:4,remarksTtile:""},{mid:5,remarksTtile:""},{mid:6,remarksTtile:""},{mid:7,remarksTtile:""},{mid:8,remarksTtile:""},{mid:9,remarksTtile:""}],nowChooseId:"",remarksText:"",querSendData:"",queryCrc:""}},methods:{goback:function(){this.$store.state.routerOprete=4,this.pageFrom?this.$router.push(this.pageFrom):this.$router.push("/newIndex")},go:function(a){this.$router.push(a)},getTtile:function(a){return"M"+(a+1)},goDetail:function(a,n){var e=this;this.$store.state.routerOprete=4,this.isLoading=!0,this.LoadingTimer=setTimeout(function(){e.isLoading&&(e.isLoading=!1)},11e3),this.remarksText=n,this.nowChooseId=a;var t=this.getDirective("CALL_MEMORY","CALL_MEMORY"),o=this.jinzhiChangeFuc(a),i=this.crcModelBusClacQuery(t+o,!0),s="DA"+t+o+i;console.log("sendData"+s),this.GLOBAL_CONFIG.TESTFLAG?this.testDataBuildFuc(a+""):(this.querSendData=s,this.queryCrc=i,this.callSendDataToBleUtil("saveManage",s,i))},broastFromAndroid:function(a,n,e,t){this.isLoading=!1,clearTimeout(this.LoadingTimer);var s=(a=a.replace(/\s+/g,"")).substring(4,6);s=parseInt(s,16).toString(2),s=(Array(8).join(0)+s).slice(-8),s=parseInt(s.substring(1,7),2);var r=a;if(this.wtlLog("weld_saveMange_manage","pupnum="+s+",index="+e+",newData"+r),parseInt(s)==e){var A=this.rstModelType(a);if(0!=A){this.$store.state.memoryInfo={},console.log("newData:::::"+r);var d=this.buildData("memory",A.crcCode,r.replace(/(.{2})/g,"$1 ").replace(/(^\s*)|(\s*$)/g,""));if(console.log("mammama:"+d),this.wtlLog("weld_saveMange_manage","rst="+o()(d),""),"{}"!=o()(d)){var l=a.substring(a.length-4,a.length);t||("env_ios"==this.envType?this.callSendDataToBleUtil("newIndex","DAFF"+l+this.crcModelBusClacQuery("FF"+l,!0),l):window.android.callSendDataToBle("newIndex","DAFF"+l+this.crcModelBusClacQuery("FF"+l,!0),l)),this.$router.push({path:"/saveDetail",query:{modelCrc:A.crcCode,name:A.name,pupnum:e,remarksText:this.remarksText,querSendData:this.querSendData,queryCrc:this.queryCrc}})}}else Object(i.Toast)({message:"error data",position:"middle",iconClass:"icon icon-success",duration:1500})}else Object(i.Toast)({message:"Inconsistent number of channels for response",position:"middle",iconClass:"icon icon-success",duration:1500})},rstModelType:function(a){switch(a.substring(2,4).toLocaleUpperCase()){case"D1":return this.GLOBAL_CONFIG.callWeldTypeData.migsyn;case"D2":return this.GLOBAL_CONFIG.callWeldTypeData.migman;case"D3":return this.GLOBAL_CONFIG.callWeldTypeData.tigsyn;case"D4":return this.GLOBAL_CONFIG.callWeldTypeData.tigman;case"D5":return this.GLOBAL_CONFIG.callWeldTypeData.mma;default:return 0}},testDataBuildFuc:function(a){switch(a){case"1":this.broastFromAndroid("dad1 82 04 01 03 07 35 4600 4900 e100 a600 0208 95d0","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"2":this.broastFromAndroid("dad2 02 00 3D00 c800 00 7503","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"3":this.broastFromAndroid("dad3 06 00 05 00 0041 0000 0000 e1  4c39","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"4":this.broastFromAndroid("dad4 04 00 c0 32 3200 32 3200 3200 e800 32 32 3200 32 50 23 5FAD","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"5":this.broastFromAndroid("dad5 05 82 00 01 09 6400 6400 872E","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"6":this.broastFromAndroid("dad5 06 82 00 01 09 6400 6400 872E","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"7":this.broastFromAndroid("dad5 07 82 00 01 09 6400 6400 872E","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"8":this.broastFromAndroid("dad5 08 82 00 01 09 6400 6400 872E","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG);break;case"9":this.broastFromAndroid("dad5 09 82 00 01 09 6400 6400 872E","hisweldlist",a,this.GLOBAL_CONFIG.TESTFLAG)}i.Indicator.close()}},mounted:function(){var a=this;window.history&&window.history.pushState&&(history.pushState(null,null,document.URL),window.addEventListener("popstate",this.goBack,!1));var n=this;n.pageFrom=n.$route.query.pageFrom,n.$store.state.nowModelDirectice="",window.broastMemoryFromAndroid=function(a,e){n.wtlLog("saveManage","broastHistoryFromAndroid="+a),n.broastFromAndroid(a,e,n.nowChooseId,n.GLOBAL_CONFIG.TESTFLAG)};if(this.GLOBAL_CONFIG.TESTFLAG||this.GLOBAL_CONFIG.DEVELOPERMODEFLAG)"";else if("env_ios"==envType)this.callMemoryRemarks.forEach(function(n,e){e<9&&(a.mList[e].remarksTtile=n.remarkInfo||"")});else for(var e=(window.android.callMemoryRemarks()+"").split("||||"),t=0;t<9;t++)this.mList[t].remarksTtile=e[t]||""},created:function(){},computed:{envType:function(){return this.$store.state.envType},callMemoryRemarks:function(){return this.$store.state.callMemoryRemarks}},destroyed:function(){this.isLoading=!1,clearTimeout(this.LoadingTimer),window.removeEventListener("popstate",this.goBack,!1)}}),d={render:function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("div",{staticClass:"saveManage",class:"env_ios"==a.envType?"env_ios_gClass":""},[e("Head",{attrs:{wantTo:"/newIndex",pageBackTo:a.pageFrom,headName:"BACK"}}),a._v(" "),e("ul",{staticClass:"mListContain"},a._l(a.mList,function(n,t){return e("li",{key:t,staticClass:"m-li"},[e("div",{staticClass:"m-b",class:"b-"+t,on:{click:function(e){a.goDetail(n.mid,n.remarksTtile)}}},[a._v(a._s(n.remarksTtile))])])})),a._v(" "),e("Loading",{attrs:{"is-loading":a.isLoading}})],1)},staticRenderFns:[]};var l=e("VU/8")(A,d,!1,function(a){e("AGFn")},"data-v-a1a57b5a",null);n.default=l.exports},jyeb:function(a,n,e){var t=e("kxFB");(a.exports=e("FZ+f")(!0)).push([a.i,"\n.saveManage[data-v-a1a57b5a] {\n  width: 100%;\n  min-height: 100vh;\n  background: #053342;\n}\n.saveManage .header[data-v-a1a57b5a] {\n    position: relative;\n    height: 50px;\n    line-height: 50px;\n    font-size: 20px;\n    text-align: left;\n    color: #fff;\n    background: #010101;\n}\n.saveManage .header .licon[data-v-a1a57b5a] {\n      width: 40px;\n      height: 100%;\n      float: left;\n      padding-left: 40px;\n}\n.saveManage .header .licon span[data-v-a1a57b5a] {\n        position: absolute;\n        left: 10px;\n        top: 0;\n        content: '';\n        display: inline-block;\n        width: 13px;\n        height: 13px;\n        border-top: 1px solid #fff;\n        border-right: 1px solid #fff;\n        top: 50%;\n        -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n        -webkit-transform: translateY(-50%) rotate(225deg);\n}\n.saveManage .m-li[data-v-a1a57b5a] {\n    color: #839baa;\n    height: 40px;\n    line-height: 40px;\n    margin: 20px 20px;\n    border-radius: 2px;\n    background: -webkit-gradient(linear, left bottom, left top, from(#0a3b46), color-stop(50%, #022e38), to(#0a3b46));\n    background: -webkit-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: -o-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: linear-gradient(to top, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    -webkit-box-shadow: 0px 0px 2px 1px #103f4b;\n    box-shadow: 0px 0px 2px 1px #103f4b;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    padding-right: 20px;\n    padding-left: 10px;\n    position: relative;\n}\n.saveManage .m-li .rid[data-v-a1a57b5a] {\n      padding: 0 25px;\n      margin-right: 20px;\n}\n.saveManage .m-li .m-b[data-v-a1a57b5a] {\n      height: 40px;\n      padding-right: 20px;\n      padding-left: 45px;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      -o-text-overflow: ellipsis;\n      overflow: hidden;\n}\n.saveManage .m-li .m-b.b-0[data-v-a1a57b5a] {\n      background: url("+t(e("MWU3"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-1[data-v-a1a57b5a] {\n      background: url("+t(e("6L8o"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-2[data-v-a1a57b5a] {\n      background: url("+t(e("9koF"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-3[data-v-a1a57b5a] {\n      background: url("+t(e("loym"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-4[data-v-a1a57b5a] {\n      background: url("+t(e("O6bc"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-5[data-v-a1a57b5a] {\n      background: url("+t(e("KiIR"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-6[data-v-a1a57b5a] {\n      background: url("+t(e("gAB4"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-7[data-v-a1a57b5a] {\n      background: url("+t(e("54xV"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-8[data-v-a1a57b5a] {\n      background: url("+t(e("AO84"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li[data-v-a1a57b5a]::after {\n    position: absolute;\n    right: 10px;\n    top: 0;\n    content: '';\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    border-top: 1px solid #3a6373;\n    border-right: 1px solid #3a6373;\n    top: 50%;\n    -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n    -webkit-transform: translateY(-50%) rotate(45deg);\n}\n","",{version:3,sources:["/Users/lijiangyong/lijiangyong/Documents/a_wtl/混合开发用www_ios/www/src/pages/save/saveManage.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;CACrB;AACD;IACI,mBAAmB;IACnB,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;IACjB,YAAY;IACZ,oBAAoB;CACvB;AACD;MACM,YAAY;MACZ,aAAa;MACb,YAAY;MACZ,mBAAmB;CACxB;AACD;QACQ,mBAAmB;QACnB,WAAW;QACX,OAAO;QACP,YAAY;QACZ,sBAAsB;QACtB,YAAY;QACZ,aAAa;QACb,2BAA2B;QAC3B,6BAA6B;QAC7B,SAAS;QACT,+CAA+C;QAC/C,2CAA2C;QAC3C,mDAAmD;CAC1D;AACD;IACI,eAAe;IACf,aAAa;IACb,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;IACnB,kHAAkH;IAClH,mFAAmF;IACnF,8EAA8E;IAC9E,2EAA2E;IAC3E,4CAA4C;IAC5C,oCAAoC;IACpC,oBAAoB;IACpB,iBAAiB;IACjB,2BAA2B;OACxB,wBAAwB;IAC3B,oBAAoB;IACpB,mBAAmB;IACnB,mBAAmB;CACtB;AACD;MACM,gBAAgB;MAChB,mBAAmB;CACxB;AACD;MACM,aAAa;MACb,oBAAoB;MACpB,mBAAmB;MACnB,oBAAoB;MACpB,wBAAwB;MACxB,2BAA2B;MAC3B,iBAAiB;CACtB;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;IACI,mBAAmB;IACnB,YAAY;IACZ,OAAO;IACP,YAAY;IACZ,sBAAsB;IACtB,WAAW;IACX,YAAY;IACZ,8BAA8B;IAC9B,gCAAgC;IAChC,SAAS;IACT,+CAA+C;QAC3C,2CAA2C;IAC/C,kDAAkD;CACrD",file:"saveManage.vue",sourcesContent:["\n.saveManage[data-v-a1a57b5a] {\n  width: 100%;\n  min-height: 100vh;\n  background: #053342;\n}\n.saveManage .header[data-v-a1a57b5a] {\n    position: relative;\n    height: 50px;\n    line-height: 50px;\n    font-size: 20px;\n    text-align: left;\n    color: #fff;\n    background: #010101;\n}\n.saveManage .header .licon[data-v-a1a57b5a] {\n      width: 40px;\n      height: 100%;\n      float: left;\n      padding-left: 40px;\n}\n.saveManage .header .licon span[data-v-a1a57b5a] {\n        position: absolute;\n        left: 10px;\n        top: 0;\n        content: '';\n        display: inline-block;\n        width: 13px;\n        height: 13px;\n        border-top: 1px solid #fff;\n        border-right: 1px solid #fff;\n        top: 50%;\n        -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n        -webkit-transform: translateY(-50%) rotate(225deg);\n}\n.saveManage .m-li[data-v-a1a57b5a] {\n    color: #839baa;\n    height: 40px;\n    line-height: 40px;\n    margin: 20px 20px;\n    border-radius: 2px;\n    background: -webkit-gradient(linear, left bottom, left top, from(#0a3b46), color-stop(50%, #022e38), to(#0a3b46));\n    background: -webkit-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: -o-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: linear-gradient(to top, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    -webkit-box-shadow: 0px 0px 2px 1px #103f4b;\n    box-shadow: 0px 0px 2px 1px #103f4b;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    padding-right: 20px;\n    padding-left: 10px;\n    position: relative;\n}\n.saveManage .m-li .rid[data-v-a1a57b5a] {\n      padding: 0 25px;\n      margin-right: 20px;\n}\n.saveManage .m-li .m-b[data-v-a1a57b5a] {\n      height: 40px;\n      padding-right: 20px;\n      padding-left: 45px;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      -o-text-overflow: ellipsis;\n      overflow: hidden;\n}\n.saveManage .m-li .m-b.b-0[data-v-a1a57b5a] {\n      background: url(../../assets/images/m1.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-1[data-v-a1a57b5a] {\n      background: url(../../assets/images/m2.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-2[data-v-a1a57b5a] {\n      background: url(../../assets/images/m3.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-3[data-v-a1a57b5a] {\n      background: url(../../assets/images/m4.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-4[data-v-a1a57b5a] {\n      background: url(../../assets/images/m5.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-5[data-v-a1a57b5a] {\n      background: url(../../assets/images/m6.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-6[data-v-a1a57b5a] {\n      background: url(../../assets/images/m7.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-7[data-v-a1a57b5a] {\n      background: url(../../assets/images/m8.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li .m-b.b-8[data-v-a1a57b5a] {\n      background: url(../../assets/images/m9.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.saveManage .m-li[data-v-a1a57b5a]::after {\n    position: absolute;\n    right: 10px;\n    top: 0;\n    content: '';\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    border-top: 1px solid #3a6373;\n    border-right: 1px solid #3a6373;\n    top: 50%;\n    -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n    -webkit-transform: translateY(-50%) rotate(45deg);\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=6.5f4bd6bf1b6312d08eaa.js.map