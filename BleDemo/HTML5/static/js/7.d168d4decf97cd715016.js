webpackJsonp([7],{"044v":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("mvHQ"),o=e.n(i),a={name:"modelList",components:{},data:function(){return{mList:[{typeName:"migman",typeShowName:"MIG MAN",weldingCur:"",weldingVoltage:""},{typeName:"migsyn",typeShowName:"MIG SYN",weldingCur:"",weldingVoltage:""},{typeName:"tigman",typeShowName:"TIG MAN",weldingCur:"",weldingVoltage:""},{typeName:"tigsyn",typeShowName:"TIG SYN",weldingCur:"",weldingVoltage:""},{typeName:"mma",typeShowName:"MMA",weldingCur:"",weldingVoltage:""}]}},methods:{goWelding:function(n){if(console.log(this.GLOBAL_CONFIG.TESTFLAG+"typeName::"+n),this.GLOBAL_CONFIG.TESTFLAG){var t="";t="migsyn"==n?"DAB1 0100 0200 8658":"migman"==n?"DAB2 0000 0000 1A1C":"tigsyn"==n?"DAB3F901DF00B618":"tigman"==n?"DAB4 0000 0000 1A94":"DAB5 0000 0000 DAA9",this.buildWeldingData(t)}},go:function(n){this.$store.state.routerOprete=10,this.$router.push(n)},buildWeldingData:function(n){var t=(n=n.replace(/\s+/g,"").toUpperCase()).substring(n.length-4,n.length+1);if(16==n.length)if(t==this.crcModelBusClacQuery(n.substring(2,n.length-4),!0)){switch(this.GLOBAL_CONFIG.TESTFLAG||window.android.callSendDataToBle("newIndex","DAFF"+t+this.crcModelBusClacQuery("FF"+t,!0),t),this.wtlLog("layout","getWeldingInfoTimes="+this.$store.state.getWeldingInfoTimes),this.$store.state.getWeldingInfoTimes=this.$store.state.getWeldingInfoTimes+1,n.substring(2,4)){case"B1":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.migsyn,this.$store.state.weldingCur=parseInt("0x"+n.substring(6,8)+n.substring(4,6),16).toString(10),this.$store.state.weldingVoltage=parseInt("0x"+n.substring(10,12)+n.substring(8,10),16).toString(10);break;case"B2":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.migman,this.$store.state.weldingCur=parseInt("0x"+n.substring(6,8)+n.substring(4,6),16).toString(10),this.$store.state.weldingVoltage=parseInt("0x"+n.substring(10,12)+n.substring(8,10),16).toString(10);break;case"B3":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.tigsyn,this.$store.state.weldingCur=parseInt("0x"+n.substring(6,8)+n.substring(4,6),16).toString(10),this.$store.state.weldingVoltage=parseInt("0x"+n.substring(10,12)+n.substring(8,10),16).toString(10);break;case"B4":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.tigman,this.$store.state.weldingCur=parseInt("0x"+n.substring(6,8)+n.substring(4,6),16).toString(10),this.$store.state.weldingVoltage=parseInt("0x"+n.substring(10,12)+n.substring(8,10),16).toString(10);break;case"B5":this.$store.state.weldingInfo=this.GLOBAL_CONFIG.callWeldTypeData.mma,this.$store.state.weldingCur=parseInt("0x"+n.substring(6,8)+n.substring(4,6),16).toString(10),this.$store.state.weldingVoltage=parseInt("0x"+n.substring(10,12)+n.substring(8,10),16).toString(10)}console.log("this.$store.state.getWeldingInfoTime"+this.$store.state.getWeldingInfoTime),"{}"!=o()(this.$store.state.rstInfo)&&(this.wtlLog("layout","weldStatus="+this.$store.state.rstInfo.initBean.weldStatus),console.log("this.$store.state.rstInfo.initBean.weldStatus"+this.$store.state.rstInfo.initBean.weldStatus),this.$store.state.weldingStatus,this.$router.push("/welding"))}else"env_ios"==this.envType?this.callSendDataToBleUtil("newIndex","DA00"+t+this.crcModelBusClacQuery("00"+t,!0),t):window.android.callSendDataToBle("newIndex","DA00"+t+this.crcModelBusClacQuery("00"+t,!0),t)}},mounted:function(){this.$store.state.weldingStatus,this.$store.state.getWeldingInfoTimes=0},created:function(){},computed:{envType:function(){return this.$store.state.envType}}},s={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"modelList"},[e("div",{staticClass:"header"},[e("div",{staticClass:"licon",on:{click:function(t){n.go("/newIndex")}}},[e("span")]),n._v("\n          back\n    ")]),n._v(" "),e("ul",{staticClass:"mListContain"},n._l(n.mList,function(t,i){return e("li",{key:i,staticClass:"m-li"},[e("div",{staticClass:"m-b",on:{click:function(e){n.goWelding(t.typeName)}}},[n._v("Go To "+n._s(t.typeShowName)+" Welding Experience")])])}))])},staticRenderFns:[]};var r=e("VU/8")(a,s,!1,function(n){e("IPhf")},"data-v-51f49d0e",null);t.default=r.exports},IPhf:function(n,t,e){var i=e("ZDf/");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("01ac941a",i,!0,{})},"ZDf/":function(n,t,e){var i=e("kxFB");(n.exports=e("FZ+f")(!0)).push([n.i,"\n.modelList[data-v-51f49d0e] {\n  width: 100%;\n  min-height: 100vh;\n  background: #053342;\n}\n.modelList .header[data-v-51f49d0e] {\n    position: relative;\n    height: 50px;\n    line-height: 50px;\n    font-size: 20px;\n    text-align: left;\n    color: #fff;\n    background: #010101;\n}\n.modelList .header .licon[data-v-51f49d0e] {\n      width: 40px;\n      height: 100%;\n      float: left;\n      padding-left: 40px;\n}\n.modelList .header .licon span[data-v-51f49d0e] {\n        position: absolute;\n        left: 10px;\n        top: 0;\n        content: '';\n        display: inline-block;\n        width: 13px;\n        height: 13px;\n        border-top: 1px solid #fff;\n        border-right: 1px solid #fff;\n        top: 50%;\n        -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n        -webkit-transform: translateY(-50%) rotate(225deg);\n}\n.modelList .m-li[data-v-51f49d0e] {\n    color: #839baa;\n    height: 40px;\n    line-height: 40px;\n    margin: 20px 20px;\n    border-radius: 2px;\n    background: -webkit-gradient(linear, left bottom, left top, from(#0a3b46), color-stop(50%, #022e38), to(#0a3b46));\n    background: -webkit-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: -o-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: linear-gradient(to top, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    -webkit-box-shadow: 0px 0px 2px 1px #103f4b;\n    box-shadow: 0px 0px 2px 1px #103f4b;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    padding-right: 20px;\n    padding-left: 10px;\n    position: relative;\n}\n.modelList .m-li .rid[data-v-51f49d0e] {\n      padding: 0 25px;\n      margin-right: 20px;\n}\n.modelList .m-li .m-b[data-v-51f49d0e] {\n      height: 40px;\n      padding-right: 20px;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      -o-text-overflow: ellipsis;\n      overflow: hidden;\n}\n.modelList .m-li .m-b.b-0[data-v-51f49d0e] {\n      background: url("+i(e("MWU3"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-1[data-v-51f49d0e] {\n      background: url("+i(e("6L8o"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-2[data-v-51f49d0e] {\n      background: url("+i(e("9koF"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-3[data-v-51f49d0e] {\n      background: url("+i(e("loym"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-4[data-v-51f49d0e] {\n      background: url("+i(e("O6bc"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-5[data-v-51f49d0e] {\n      background: url("+i(e("KiIR"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-6[data-v-51f49d0e] {\n      background: url("+i(e("gAB4"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-7[data-v-51f49d0e] {\n      background: url("+i(e("54xV"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-8[data-v-51f49d0e] {\n      background: url("+i(e("AO84"))+") no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li[data-v-51f49d0e]::after {\n    position: absolute;\n    right: 10px;\n    top: 0;\n    content: '';\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    border-top: 1px solid #3a6373;\n    border-right: 1px solid #3a6373;\n    top: 50%;\n    -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n    -webkit-transform: translateY(-50%) rotate(45deg);\n}\n","",{version:3,sources:["/Users/lijiangyong/lijiangyong/Documents/a_wtl/混合开发用www_ios/www/src/pages/experiential/modelList.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;CACrB;AACD;IACI,mBAAmB;IACnB,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;IACjB,YAAY;IACZ,oBAAoB;CACvB;AACD;MACM,YAAY;MACZ,aAAa;MACb,YAAY;MACZ,mBAAmB;CACxB;AACD;QACQ,mBAAmB;QACnB,WAAW;QACX,OAAO;QACP,YAAY;QACZ,sBAAsB;QACtB,YAAY;QACZ,aAAa;QACb,2BAA2B;QAC3B,6BAA6B;QAC7B,SAAS;QACT,+CAA+C;QAC/C,2CAA2C;QAC3C,mDAAmD;CAC1D;AACD;IACI,eAAe;IACf,aAAa;IACb,kBAAkB;IAClB,kBAAkB;IAClB,mBAAmB;IACnB,kHAAkH;IAClH,mFAAmF;IACnF,8EAA8E;IAC9E,2EAA2E;IAC3E,4CAA4C;IAC5C,oCAAoC;IACpC,oBAAoB;IACpB,iBAAiB;IACjB,2BAA2B;OACxB,wBAAwB;IAC3B,oBAAoB;IACpB,mBAAmB;IACnB,mBAAmB;CACtB;AACD;MACM,gBAAgB;MAChB,mBAAmB;CACxB;AACD;MACM,aAAa;MACb,oBAAoB;MACpB,oBAAoB;MACpB,wBAAwB;MACxB,2BAA2B;MAC3B,iBAAiB;CACtB;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;MACM,oDAAsD;MACtD,sBAAsB;MACtB,iCAAiC;MACjC,4BAA4B;CACjC;AACD;IACI,mBAAmB;IACnB,YAAY;IACZ,OAAO;IACP,YAAY;IACZ,sBAAsB;IACtB,WAAW;IACX,YAAY;IACZ,8BAA8B;IAC9B,gCAAgC;IAChC,SAAS;IACT,+CAA+C;QAC3C,2CAA2C;IAC/C,kDAAkD;CACrD",file:"modelList.vue",sourcesContent:["\n.modelList[data-v-51f49d0e] {\n  width: 100%;\n  min-height: 100vh;\n  background: #053342;\n}\n.modelList .header[data-v-51f49d0e] {\n    position: relative;\n    height: 50px;\n    line-height: 50px;\n    font-size: 20px;\n    text-align: left;\n    color: #fff;\n    background: #010101;\n}\n.modelList .header .licon[data-v-51f49d0e] {\n      width: 40px;\n      height: 100%;\n      float: left;\n      padding-left: 40px;\n}\n.modelList .header .licon span[data-v-51f49d0e] {\n        position: absolute;\n        left: 10px;\n        top: 0;\n        content: '';\n        display: inline-block;\n        width: 13px;\n        height: 13px;\n        border-top: 1px solid #fff;\n        border-right: 1px solid #fff;\n        top: 50%;\n        -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n        -webkit-transform: translateY(-50%) rotate(225deg);\n}\n.modelList .m-li[data-v-51f49d0e] {\n    color: #839baa;\n    height: 40px;\n    line-height: 40px;\n    margin: 20px 20px;\n    border-radius: 2px;\n    background: -webkit-gradient(linear, left bottom, left top, from(#0a3b46), color-stop(50%, #022e38), to(#0a3b46));\n    background: -webkit-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: -o-linear-gradient(bottom, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    background: linear-gradient(to top, #0a3b46 0%, #022e38 50%, #0a3b46 100%);\n    -webkit-box-shadow: 0px 0px 2px 1px #103f4b;\n    box-shadow: 0px 0px 2px 1px #103f4b;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    padding-right: 20px;\n    padding-left: 10px;\n    position: relative;\n}\n.modelList .m-li .rid[data-v-51f49d0e] {\n      padding: 0 25px;\n      margin-right: 20px;\n}\n.modelList .m-li .m-b[data-v-51f49d0e] {\n      height: 40px;\n      padding-right: 20px;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      -o-text-overflow: ellipsis;\n      overflow: hidden;\n}\n.modelList .m-li .m-b.b-0[data-v-51f49d0e] {\n      background: url(../../assets/images/m1.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-1[data-v-51f49d0e] {\n      background: url(../../assets/images/m2.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-2[data-v-51f49d0e] {\n      background: url(../../assets/images/m3.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-3[data-v-51f49d0e] {\n      background: url(../../assets/images/m4.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-4[data-v-51f49d0e] {\n      background: url(../../assets/images/m5.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-5[data-v-51f49d0e] {\n      background: url(../../assets/images/m6.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-6[data-v-51f49d0e] {\n      background: url(../../assets/images/m7.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-7[data-v-51f49d0e] {\n      background: url(../../assets/images/m8.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li .m-b.b-8[data-v-51f49d0e] {\n      background: url(../../assets/images/m9.png) no-repeat;\n      background-size: 26px;\n      background-position: left center;\n      background-position-x: 10px;\n}\n.modelList .m-li[data-v-51f49d0e]::after {\n    position: absolute;\n    right: 10px;\n    top: 0;\n    content: '';\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    border-top: 1px solid #3a6373;\n    border-right: 1px solid #3a6373;\n    top: 50%;\n    -ms-transform: translate(50%, 0) rotate(45deg);\n        transform: translate(50%, 0) rotate(45deg);\n    -webkit-transform: translateY(-50%) rotate(45deg);\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=7.d168d4decf97cd715016.js.map