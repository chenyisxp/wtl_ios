//
//  BleHelper.swift
//  BleDemo
//
//  Created by Lynx on 24/03/2020.
//  Copyright © 2020 Lynx. All rights reserved.
//


import UIKit
import CoreBluetooth

enum BleState: Int {
    case ready
    case scaning
    case connecting
    case connected
}

///传出蓝牙当前连接的设备发送过来的信息
typealias BleDataBlock = (_ data: Data) -> Void
///传出蓝牙当前搜索到的设备信息
typealias BlePeripheralsBlock = (_ pArray: [CBPeripheral]) -> Void
//当设备连接成功时，记录该设备，用于请求设备版本号
typealias BleConnectedBlock = (_ peripheral: CBPeripheral, _ characteristic:CBCharacteristic) -> Void

class BleHelper: NSObject {
    private let BLE_WRITE_UUID = "FFE1"
    private let BLE_NOTIFY_UUID = "FFE1"
    // 当前连接的设备
    var nowperipheral:CBPeripheral!
    //发送数据特征(连接到设备之后可以把需要用到的特征保存起来，方便使用)
    var sendCharacteristic:CBCharacteristic?
    static let shared = BleHelper()
    
    var bleState:BleState = .ready
    var powerStatus:String = "";
    //传出扫描到的设备
    var backPeripheralsBlock:BlePeripheralsBlock?
    ///传出当前连接成功的设备
    var backConnectedBlock:BleConnectedBlock?
    //传出数据
    var backDataBlock: BleDataBlock?
    
    var centralManager:CBCentralManager?
    ///扫描到的所有设备
    var aPeArray:[CBPeripheral] = []
    //当前连接的设备
    var pe:CBPeripheral?
    var writeCh: CBCharacteristic?
    var notifyCh: CBCharacteristic?
    
    override init() {
        super.init()
        centralManager = CBCentralManager(delegate: self, queue: nil, options: [CBCentralManagerOptionShowPowerAlertKey:false])
    }
    
    //MARK: - Public Method
    
    ///保存当前选中的设备
    func setSelectedPeripherals(peripheral:CBPeripheral) {
        pe = peripheral
    }
    
    //主动获取搜索到的peripheral列表
    func getPeripheralList() -> [CBPeripheral] {
        return aPeArray
    }
    
    //MARK: - Private Method
    
    //连接指定的设备
    func doConnect(peripheral:CBPeripheral) {
        print("连接了吗 ")
        bleState = .connecting
        centralManager?.connect(peripheral, options: nil)
        peripheral.delegate = self
        // 保存当前连接设备
        self.nowperipheral = peripheral
    }
    
    ///断开连接
    func disconnect(peripheral: CBPeripheral) {
        centralManager?.cancelPeripheralConnection(peripheral);
        self.nowperipheral = nil;//清空？？
    }
    
    ///开始扫描
    func startScan(serviceUUIDS:[CBUUID]? = nil, options:[String: Any]? = nil) {
        print("开始扫描")
        aPeArray = []
        
        bleState = .scaning
        centralManager?.scanForPeripherals(withServices: serviceUUIDS, options: options)
    }
    
    ///停止扫描
    func stopScan() {
        centralManager?.stopScan()
        bleState = .ready
    }
    
//    ///发送数据包给设备
//    func sendPacketWithPieces(data:Data, peripheral:CBPeripheral, characteristic:CBCharacteristic, type: CBCharacteristicWriteType = CBCharacteristicWriteType.withResponse) {
//
//        let step = 20
//        for index in stride(from: 0, to: data.count, by: step) {
//            var len = data.count - index
//            if len > step {
//                len = step
//            }
//            let pData: Data = (data as NSData).subdata(with: NSRange(location: index, length: len))
//            peripheral.writeValue(pData, for: characteristic, type: type)
//        }
//    }
    // MARK: 写数据 原文链接：https://blog.csdn.net/FTD1120/article/details/83143385
    func writeToPeripheral(_ data: Data) {
        print("writeToPeripheral\(data)")
//        print(writeCh)
        nowperipheral.writeValue(data , for: writeCh!, type: CBCharacteristicWriteType.withoutResponse)
    }
    
    ///传出蓝牙传输数据
    func setDataBlock(block:@escaping BleDataBlock) {
        backDataBlock = block
    }
    
    ///传出当前扫描出来的设备信息
    func setPeripheralsBlock(block:@escaping BlePeripheralsBlock) {
        backPeripheralsBlock = block
    }
    
    ///传出已连接的设备的信息，该参数当前用于获取设备版本号
    func setConnectedBlock(block:@escaping BleConnectedBlock) {
        backConnectedBlock = block
    }
    
}

//MARK: - Ble Delegate

extension BleHelper:CBCentralManagerDelegate {
    // MARK: 检查运行这个App的设备是不是支持BLE。
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        
        if #available(iOS 10.0, *) {
            print("log:central.state\(central.state)||\( CBManagerState.poweredOn)")
//            if central.state == CBManagerState.poweredOn {
//                print("powered on")
//
//                startScan()
//            } else {
//                print("powered else了吗\(CBManagerState.poweredOff)")
//                if central.state == CBManagerState.poweredOff {
//                    print("BLE powered off")
//                } else if central.state == CBManagerState.unauthorized {
//                    print("BLE unauthorized")
//                } else if central.state == CBManagerState.unknown {
//                    print("BLE unknown")
//                } else if central.state == CBManagerState.resetting {
//                    print("BLE ressetting")
//                }
//            }
            switch (central.state) {
            case CBManagerState.poweredOn:
                 powerStatus = "poweredOn";
                 print("powered on")
                //蓝牙开启状态
                //扫描外设
//                centralManager?.scanForPeripherals(withServices: [CBUUID.init(string: "0000ffe1-0000-1000-8000-00805f9b34fb")], options: [CBCentralManagerScanOptionAllowDuplicatesKey :true])//是为了过滤掉其他设备，可以搜索特定标示的设备
//                 startScan();
                break
            case CBManagerState.poweredOff:
                powerStatus = "poweredOff";
                //蓝牙关闭状态
                 print("powered poweredOff")
                break
            case CBManagerState.unauthorized:
                powerStatus = "unauthorized";
                //蓝牙未授权
                 print("powered unauthorized")
                break
            default:
                powerStatus = "unknown";
                 print("powered unknown")
                break
            }
        } else {
            // Fallback on earlier versions
        }
    }
    
    // 开始扫描之后会扫描到蓝牙设备，扫描到之后走到这个代理方法
    // MARK: 中心管理器扫描到了设备
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        guard !aPeArray.contains(peripheral), let deviceName = peripheral.name, deviceName.count > 0 else {
            //没有找到新蓝牙
//            print("扫描到的结果1\(peripheral.name ?? "无1")")
            return
        }
        //有蓝牙
//       print("扫描到的结果2\(peripheral.name ??  "无2")")
        if peripheral.name=="HC-08" {
//             print("扫描到的结果3\(peripheral.name ??  "无2")")
        }
//        <CBPeripheral: 0x281ac52c0, identifier = 663E99B6-39F0-CD53-CF0C-BEB6CA13B875, name = HC-08, state = disconnected>
        aPeArray.append(peripheral)
        //传出去实时刷新
        if let backPeripheralsBlock = backPeripheralsBlock {
            
            backPeripheralsBlock(aPeArray)
        }
    }
    
    // MARK: 连接外设成功，开始发现服务
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        bleState = .connected
        print("\(#function)连接外设成功。\ncentral:\(central),peripheral:\(peripheral)\n")
        // 设置代理
        peripheral.delegate = self
        // 开始发现服务
        peripheral.discoverServices(nil)
    }
    
    // MARK: 连接外设失败
    func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        bleState = .ready
        print("\(#function)连接外设失败\n\(String(describing: peripheral.name))连接失败：\(String(describing: error))\n")
        // 这里可以发通知出去告诉设备连接界面连接失败
        
        
    }
    
    // MARK: 连接丢失
    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        bleState = .ready
        print("\(#function)连接丢失\n外设：\(String(describing: peripheral.name))\n错误：\(String(describing: error))\n")
        // 这里可以发通知出去告诉设备连接界面连接丢失
        
    }
}

extension BleHelper: CBPeripheralDelegate {
//    //MARK: 匹配对应服务UUID
//    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
//        if let error = error  {
//            print("\(#function)搜索到服务-出错\n设备(peripheral)：\(String(describing: peripheral.name)) 搜索服务(Services)失败：\(error)\n")
//            return
//        } else {
//            print("\(#function)搜索到服务\n设备(peripheral)：\(String(describing: peripheral.name))\n")
//        }
//        for service in peripheral.services ?? [] {
//            peripheral.discoverCharacteristics(nil, for: service)
//        }
//    }
//
//    //MARK: 服务下的特征
//    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
//        if let _ = error {
//            print("\(#function)发现特征\n设备(peripheral)：\(String(describing: peripheral.name))\n服务(service)：\(String(describing: service))\n扫描特征(Characteristics)失败：\(String(describing: error))\n")
//            return
//        } else {
//            print("\(#function)发现特征\n设备(peripheral)：\(String(describing: peripheral.name))\n服务(service)：\(String(describing: service))\n服务下的特征：\(service.characteristics ?? [])\n")
//        }
//
//        for characteristic in service.characteristics ?? [] {
//            print("uuid是多少\(characteristic.uuid.uuidString.lowercased())")
//            if characteristic.uuid.uuidString.lowercased().isEqual(BLE_WRITE_UUID) {
//                pe = peripheral
//                writeCh = characteristic
//
//                if let block = backConnectedBlock {
//
//                    block(peripheral,characteristic)
//                }
//            } else if characteristic.uuid.uuidString.lowercased().isEqual(BLE_NOTIFY_UUID) {
//                //该组参数无用
//                notifyCh = characteristic
//                // 订阅特征值，订阅成功后后续所有的值变化都会自动通知
//                peripheral.setNotifyValue(true, for: characteristic)
//            }
//            //此处代表连接成功
//        }
//    }
//
//    // MARK: 获取外设发来的数据
//    // 注意，所有的，不管是 read , notify 的特征的值都是在这里读取
//    func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
//         print("有没有传上来0：\(String(describing: error))")
//        if let _ = error {
//            print("有没有传上来1：\(String(describing: error))")
//            return
//        }
//        //拿到设备发送过来的值,传出去并进行处理
//        if let dataBlock = backDataBlock, let data = characteristic.value {
//
//            print("有没有传上来2：\(data)")
//            dataBlock(data)
//        }
//    }
//
//    //MARK: 检测中心向外设写数据是否成功
//    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor characteristic: CBCharacteristic, error: Error?) {
//        if let error = error {
//            print("\(#function)\n发送数据失败！错误信息：\(error)")
//        }
//    }
    
// ----------------- 第二家看看 ---------------------
    
    //MARK: - 匹配对应服务UUID
    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?){
        if error != nil {
            return
        }
        for service in peripheral.services! {
            peripheral.discoverCharacteristics(nil, for: service )
        }
    }
    //MARK: - 服务下的特征
    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?){
        if (error != nil){
            return
        }
        for  characteristic in service.characteristics! {
            print("具体特征值\(characteristic.uuid.description)")
            switch characteristic.uuid.description {
                
            case "FFE1":
                bleState = .connected
                // 订阅特征值，订阅成功后后续所有的值变化都会自动通知
                print("订阅成功后后续所有的值变化都会自动通知")
                writeCh = characteristic;
                peripheral.setNotifyValue(true, for: characteristic)
            case "******":
                // 读区特征值，只能读到一次
                peripheral.readValue(for:characteristic)
            default:
                print("扫描到其他特征")
            }
        }
    }
    //MARK: - 特征的订阅状体发生变化
    func peripheral(_ peripheral: CBPeripheral, didUpdateNotificationStateFor characteristic: CBCharacteristic, error: Error?){
        guard error == nil  else {
            return
        }
    }
    // MARK: - 获取外设发来的数据
    // 注意，所有的，不管是 read , notify 的特征的值都是在这里读取
    func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?)-> (){
        if(error != nil){
            return
        }
        switch characteristic.uuid.uuidString {
        case "FFE1":
            bleState = .connected
            print("接收到了设备的温度特征的值的变化")
            if let dataBlock = backDataBlock, let data = characteristic.value {
                print("有没有传上来2：\(data)")
                dataBlock(data)
            }
        default:
            print("收到了其他数据特征数据: \(characteristic.uuid.uuidString)")
        }
    }
    //MARK: - 检测中心向外设写数据是否成功
    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor characteristic: CBCharacteristic, error: Error?) {
        if(error != nil){
            print("发送数据失败!error信息:\(String(describing: error))")
        }
    }
    
}
