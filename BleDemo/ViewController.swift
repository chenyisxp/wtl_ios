//
//  ViewController.swift
//  BleDemo
//
//  Created by Lynx on 23/03/2020.
//  Copyright © 2020 Lynx. All rights reserved.
//

import UIKit
import CoreBluetooth
import WebKit
//使用枚举作为关键字， 避免重复键值
enum Keys: String {
    case Array = "array"
    case StrName = "name"
    case IntAge = "age"
}

class ViewController: UIViewController,WKScriptMessageHandler, UIImagePickerControllerDelegate, UINavigationControllerDelegate ,LBXScanViewControllerDelegate{
    // 禁止自动旋转
    override var shouldAutorotate : Bool {
        return false
    }
    var pageFromH5:String?
    var theWebView:WKWebView?
    let cellID = "cellIdentifier"
    var bleHelper = BleHelper.shared
    var pArray:[CBPeripheral] = []
    var pArrayString:String = ""
    override func viewDidLoad() {
        super.viewDidLoad()
        // **************** 扫苗
        //自定义视图导航标题
//        self.title = "二维码/条码"
//        navigationController?.navigationBar.barStyle = .blackTranslucent
//        navigationController?.navigationBar.tintColor = UIColor.white
//        
//        //扫描动画：在github下载项目，复制CodeScan.bundle获取图片
//        var style = LBXScanViewStyle()
//        style.anmiationStyle = .NetGrid
//        style.animationImage = UIImage(named: "qrcode_scan_part_net")//引用bundle中的图片
        //****************
        // Do any additional setup after loading the view.
//        edgesForExtendedLayout = .top//顶部y空白
//        testWebview();
        //获取数据库实例
        
        setData()
        //引入html5
        //-----begin------
        let path = Bundle.main.path(forResource: "index", ofType: ".html",
                                    inDirectory: "HTML5")
        let url = URL(fileURLWithPath:path!)
        let request = URLRequest(url:url)
        self.navigationController?.navigationBar.isHidden = true;//隐藏导航栏要不然底部会有空白区域
//        self.navigationController?.navigationBar.barStyle = UIBarStyle.black;//状态栏颜色
        // 设置导航栏 背景 为 红色
//        let barColor = UIColor(red:94/255.0, green:94/255.0, blue:94/255.0, alpha:1)
//        self.navigationController?.navigationBar.barTintColor =  barColor;
       
        //创建供js调用的接口
        let theConfiguration = WKWebViewConfiguration()
        theConfiguration.userContentController.add(self, name: "interOp")
        //将浏览器视图全屏(在内容区域全屏,不占用顶端时间条)
        let frame = CGRect(x:0, y:0, width:UIScreen.main.bounds.width,
                           height:UIScreen.main.bounds.height)
//        theWebView = WKWebView(frame:frame, configuration: theConfiguration)
        
        theWebView = WKWebView(frame:frame, configuration: theConfiguration)
        
        //禁用页面在最顶端时下拉拖动效果
        theWebView!.scrollView.bounces = false
        //加载页面
        theWebView!.load(request)
        self.view.addSubview(theWebView!)
        //-----end------
    }
    //响应处理js那边的调用
    func userContentController(_ userContentController:WKUserContentController,
                               didReceive message: WKScriptMessage) {
//        print(message.body)
        let sentData = message.body as! Dictionary<String,String>
        //判断是确认添加购物车操作
        if(sentData["method"] == "addToCarCheck"){
            //获取商品名称
            let itemName = sentData["name"]!
            let alertController = UIAlertController(title: "系统提示",
                                                    message: "确定把\(itemName)添加到购物车吗？",
                preferredStyle: .alert)
            let cancelAction = UIAlertAction(title: "取消", style: .cancel, handler: nil)
            let okAction = UIAlertAction(title: "确定", style: .default, handler: {
                action in
                print("点击了确定")
                //调用页面里加入购物车js方法
                self.theWebView!.evaluateJavaScript("addToCar('\(itemName)')",
                    completionHandler: nil)
            })
            alertController.addAction(cancelAction)
            alertController.addAction(okAction)
            self.present(alertController, animated: true, completion: nil)
        }else if(sentData["method"] == "handleStartScan"){
            print("开始扫描")
            bleHelper.startScan();
            
        }else if(sentData["method"] == "handleStopScan"){
            print("停止扫描")
            bleHelper.stopScan();
            
        }else if(sentData["method"] == "handleConnect"){
             let itemName = sentData["keyName"]!
            // 663E99B6-39F0-CD53-CF0C-BEB6CA13B875
            print("我想要连接"+itemName )
            print(self.pArray)
            
            for s in self.pArray{
                if s.identifier.description == itemName {
                     print("结束===判断是否相等======")
//                     bleHelper.doConnect(peripheral: self.pArray[0])
                     bleHelper.doConnect(peripheral: s)
                }
                print(s.identifier.description)
                print(s.name ?? "")
                print("结束=========")
            }
            
            //连接 加入没有扫描的话需要自己创建对象
            
            
        }else if(sentData["method"] == "handleDisConnect"){
            print("我想要端开连接")
            bleHelper.disconnect(peripheral: self.pArray[0])
        }else if(sentData["method"] == "handleSendData"){
            let sendDt = sentData["sendDt"]!
            print("我想要发送数据")
            if(bleHelper.bleState == BleState.connected){
                let str:String = sendDt
                //字符串转Data
//                let data = str.data(using: String.Encoding.utf8)

                
//                let data = "dae1100000";
                let data1:Data =  Data(hex: str)
                bleHelper.writeToPeripheral(data1);
                print(data1)
            }else{
                print("我想要发送数据！！请先连接蓝牙")
                return;
            }
          
        }else if(sentData["method"] == "handleReadData"){
            print("我想要读取数据")
            
        }else if(sentData["method"] == "handleGetBleState"){
            print("我想要读取连接状态")
            print(bleHelper.bleState)
            self.theWebView!.evaluateJavaScript("sendToHtmlBleState('\(bleHelper.bleState)')",
                completionHandler: nil)
        }else if(sentData["method"] == "handleGetBleStateByLayout"){
//            print("我想要读取连接状态Layout")
//            print(bleHelper.bleState)
            self.theWebView!.evaluateJavaScript("sendToLayloutBleState('\(bleHelper.bleState)')",
                completionHandler: nil)
        }else if(sentData["method"] == "handleGetBleStateByIndex"){
//            print("我想要读取连接状态Index")
            self.theWebView!.evaluateJavaScript("sendToIndexBleState('\(bleHelper.bleState)')",
                completionHandler: nil)
        }else if(sentData["method"] == "handleOpenIosScan"){
            print("我想要开启二维码识别")
            LBXPermissions.authorizeCameraWith { [weak self] (granted) in
                if granted {
                    print("我想要开启二维码识别---granted")
                    self?.scanQrCode()
                    //scanQrCode();
                } else {
                    LBXPermissions.jumpToSystemPrivacySetting()
                }
            }
        }else if(sentData["method"] == "handSaveWrite"){
                print("我想要存储数据")
                let keyName = sentData["keyName"]!
                let valueName = sentData["valueName"]!
                let manager = UserDefaults()
                manager.setValue(valueName, forKey: keyName)  //存储字符串
//                let days = ["Mon","Tues","Weds","Thurs","Fri","Sat","Sun"]
//                manager.set(days, forKey: Keys.Array.rawValue)   //存储数组
//
//                let age = 20
//                manager.set(age, forKey: Keys.IntAge.rawValue)  //存储整型
        }else if(sentData["method"] == "handSaveRead"){
                print("我想要读取存储的数据")
             let keyName = sentData["keyName"]!
            let manager = UserDefaults()
            let name: String? = manager.string(forKey: keyName)  //根据关键字取值
            //如果name不是nil则显示name参数的值，为nil时显示??后面的empty name
            print(name ?? "empty name")    //注意name是optional， 可能为nil; 注意??的用法
            self.theWebView!.evaluateJavaScript("sendToHtmlLastConnectBle('\(name ?? "")')",
            completionHandler: nil)
//            let array = manager.array(forKey: Keys.Array.rawValue)
//            if let noemptyarray = array {    //如果array不空则进入
//                for data in noemptyarray {   //遍历数组
//                    print(data)
//                }
//            }
//
//            let savedAge = manager.integer(forKey: Keys.IntAge.rawValue)
//            print(savedAge)  //打印整型
        }else if(sentData["method"] == "handSaveReadByFuction"){
                        print("handSaveReadByFuction2")
                    let keyName = sentData["keyName"]!
                    let manager = UserDefaults()
                    let name: String? = manager.string(forKey: keyName)  //根据关键字取值
//                    print(name ??  "77")
                    //如果name不是nil则显示name参数的值，为nil时显示??后面的empty name
                    //动态拼接方法 根据方法名去完成
            print("\(keyName )('\(name ?? "")')" )
            self.theWebView!.evaluateJavaScript("\(keyName )('\(name ?? "")')",
                    completionHandler: nil)
      
        }else if(sentData["method"] == "handOpenWeb"){
            print("我想要打开网页")
            let keyName = sentData["keyName"]!
            self.openWeb(url: keyName);
            
        }else if(sentData["method"] == "handleMultiParams"){
            let keyName = "handleMultiParamsResponse"
             let params1 = sentData["params1"]!
            
            pageFromH5 = sentData["params2"]!
            print( pageFromH5 ?? "")//可以解决optional("pageFrom")
            
//            self.theWebView!.evaluateJavaScript("\(keyName){'\(pageFromH5))'}");,
//            completionHandler: nil)
            self.theWebView!.evaluateJavaScript("\(keyName )('\((params1,pageFromH5 ?? ""))')",
                               completionHandler: nil)
        }
        
        
        
    }
    func openWeb(url :String){
//        let webView = UIWebView();
//        let url = NSURL(string: "http://www.imoneyfans.com")
//        webView.loadRequest(NSURLRequest(url: url! as URL) as URLRequest)
//        self.view.addSubview(webView)
        //内置浏览器打开网页
//        let urlString = "http://www.wtl.com.cn/"
        let urlString = url;
        if let url = URL(string: urlString) {
            //根据iOS系统版本，分别处理
            if #available(iOS 10, *) {
                UIApplication.shared.open(url, options: [:],
                                          completionHandler: {
                                            (success) in
                })
            } else {
                UIApplication.shared.openURL(url)
            }
        }
    }
    func scanQrCode() {
        print("到这里scanQrCode")
        //设置扫码区域参数
        var style = LBXScanViewStyle()
        style.centerUpOffset = 60;
        style.xScanRetangleOffset = 30;
        if UIScreen.main.bounds.size.height <= 480 {
            //3.5inch 显示的扫码缩小
            style.centerUpOffset = 40;
            style.xScanRetangleOffset = 20;
        }
        style.color_NotRecoginitonArea = UIColor(red: 0.4, green: 0.4, blue: 0.4, alpha: 0.4)
        style.photoframeAngleStyle = LBXScanViewPhotoframeAngleStyle.Inner;
        style.photoframeLineW = 2.0;
        style.photoframeAngleW = 16;
        style.photoframeAngleH = 16;
        style.isNeedShowRetangle = false;
        style.anmiationStyle = LBXScanViewAnimationStyle.NetGrid;
        style.animationImage = UIImage(named: "qrcode_scan_full_net")
        let vc = LBXScanViewController();
        vc.scanStyle = style
        vc.scanResultDelegate = self
        //            print(self.navigationController)
        self.navigationController?.pushViewController(vc, animated: true)
        
    }
    //获取扫描结果
    func scanFinished(scanResult: LBXScanResult, error: String?) {
        print("扫描结果\(scanResult.strScanned!)")
        //调用页面里发送到html5
        self.theWebView!.evaluateJavaScript("scanResult(\(scanResult.strScanned ?? ""))",
            completionHandler: nil)
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
//    func setUI() {
//        let width = UIScreen.main.bounds.width
//        let height = UIScreen.main.bounds.height
//
//        tableView.frame = CGRect(x: 0, y: 22, width: width, height: height - 22)
//        view.addSubview(tableView)
//    }
    func testWebview() {
        //创建
        let webView = UIWebView.init(frame:self.view.frame)
        //添加
        self.view.addSubview(webView)
        webView.loadRequest(NSURLRequest(url:NSURL.init(string:"http://0.0.0.0:8081")! as URL) as URLRequest)
    }
    func setData() {
        bleHelper.setPeripheralsBlock { (peArray) in
            self.pArray = peArray
            print("处理扫描出来的蓝牙\(peArray)")
            var dataJson:String  = "";
            //我这里是传递到html5 页面
//            for i in 0..<peArray.count {
//                let item = peArray[i];
//                 dataJson+="\(item.element.name ?? "none"),\(item.element.state.rawValue),\(item.element.identifier)|||";
//            }
            //1.可用
//            for  item in peArray.enumerated(){
//                dataJson+="\(item.element.name ?? "none"),\(item.element.state.rawValue),\(item.element.identifier)|||";
//            }
//            print("遍历数组1\(dataJson)")//没关系，打印出来会带属性Optional
              //2.增加索引
              for  (index,item) in peArray.enumerated(){
                print(peArray.count)
                print(index)
                if(peArray.count == (index+1)){
                    dataJson+="\(item.name ?? "none"),\(item.identifier)";
                   }else{
                       dataJson+="\(item.name ?? "none"),\(item.identifier)|||";
                    }
               }
            print("遍历数组2\(dataJson)")//没关系，打印出来会带属性Optional
            self.theWebView!.evaluateJavaScript("handBleListToHtml5('\(dataJson)')",
                completionHandler: nil)
            
            //self.tableView.reloadData()
            self.pArrayString = dataJson;
        }
        
        bleHelper.setConnectedBlock { (backPe, backCh) in
            print("设备已连接，peripheral:\(backPe)，characteristic:\(backCh)")
        }
        
        bleHelper.setDataBlock { (data) in
            //需要传出数据
//            self.theWebView!.evaluateJavaScript("handBleListToHtml5('\(data)')",
//                           completionHandler: nil)
//            DA1000000570 对应16进制：44 41 31 30 30 30 30 30 30 30 35 37 30
//            ble data:8 bytes
              
//            ble data:[68, 65, 49, 48, 48, 48, 48, 48, 48, 53, 55, 48]//已经被转成 十进制
            print("ble data:\(data)")
            print("ble data:\([UInt8](data))")
            //传输出去的是十进制数组如[218 225] dae1
//            ble data十进制:[218, 225, 0, 0, 0, 0, 2, 0, 60, 0, 61, 0, 180, 0, 200, 0, 2, 9, 46, 119]
//            [da e1 00 00 00 00 02 00 3c 00 3d 00 b4 00 c8 00 02 09 2e 77]//后面双字节的自己拼
            
            self.theWebView!.evaluateJavaScript("iosBleDataLayoutFuc('\([UInt8](data))')",
                                       completionHandler: nil)
        }
    }
    func handleStartScan(){
//        bleHelper.startScan(serviceUUIDS: []?, options: [String : Any]?)
         bleHelper.startScan()
    }
    //MARK: Lazy Load
    
//    lazy var tableView: UITableView = {
//        let tTableView = UITableView(frame: CGRect.zero)
//        tTableView.delegate = self
//        tTableView.dataSource = self
//        tTableView.register(UITableViewCell.self, forCellReuseIdentifier: cellID)
//
//        return tTableView
//    }()
   
}

extension ViewController:UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return pArray.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellID, for: indexPath)
        
        cell.textLabel?.text = pArray[indexPath.row].name ?? ""
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        bleHelper.doConnect(peripheral: pArray[indexPath.row])
    }
}
extension Data {
    public init(hex: String) {
        self.init(bytes: Array<UInt8>(hex: hex))
    }
    public var bytes: Array<UInt8> {
        return Array(self)
    }
    public func toHexString() -> String {
        return bytes.toHexString()
    }
}

extension Array {
    public init(reserveCapacity: Int) {
        self = Array<Element>()
        self.reserveCapacity(reserveCapacity)
    }
    
    var slice: ArraySlice<Element> {
        return self[self.startIndex ..< self.endIndex]
    }
}

extension Array where Element == UInt8 {
    public init(hex: String) {
        self.init(reserveCapacity: hex.unicodeScalars.lazy.underestimatedCount)
        var buffer: UInt8?
        var skip = hex.hasPrefix("0x") ? 2 : 0
        for char in hex.unicodeScalars.lazy {
            guard skip == 0 else {
                skip -= 1
                continue
            }
            guard char.value >= 48 && char.value <= 102 else {
                removeAll()
                return
            }
            let v: UInt8
            let c: UInt8 = UInt8(char.value)
            switch c {
            case let c where c <= 57:
                v = c - 48
            case let c where c >= 65 && c <= 70:
                v = c - 55
            case let c where c >= 97:
                v = c - 87
            default:
                removeAll()
                return
            }
            if let b = buffer {
                append(b << 4 | v)
                buffer = nil
            } else {
                buffer = v
            }
        }
        if let b = buffer {
            append(b)
        }
    }
    
    public func toHexString() -> String {
        return `lazy`.reduce("") {
            var s = String($1, radix: 16)
            if s.count == 1 {
                s = "0" + s
            }
            return $0 + s
        }
    }
}
