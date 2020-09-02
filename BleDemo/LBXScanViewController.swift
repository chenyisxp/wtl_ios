//
//  LBXScanViewController.swift
//  swiftScan
//
//  Created by lbxia on 15/12/8.
//  Copyright © 2015年 xialibing. All rights reserved.
//

import UIKit
import Foundation
import AVFoundation

public protocol LBXScanViewControllerDelegate: class {
     func scanFinished(scanResult: LBXScanResult, error: String?)
}

public protocol QRRectDelegate {
    func drawwed()
}

open class LBXScanViewController: UIViewController {
    
    // 返回扫码结果，也可以通过继承本控制器，改写该handleCodeResult方法即可
    open weak var scanResultDelegate: LBXScanViewControllerDelegate?

    open var delegate: QRRectDelegate?

    open var scanObj: LBXScanWrapper?

    open var scanStyle: LBXScanViewStyle? = LBXScanViewStyle()

    open var qRScanView: LBXScanView?
    
    /**
     @brief  扫码区域上方提示文字
     */
    var topTitle: UILabel?
    
    /**
     @brief  闪关灯开启状态
     */
    var isOpenedFlash: Bool = false
    //底部显示的功能项
    var bottomItemsView: UIView?
    
    //相册
    var btnPhoto: UIButton = UIButton()
    
    //闪光灯
    var btnFlash: UIButton = UIButton()
    //关闭弹层
    var btnClosePresent: UIButton = UIButton()
    
    //我的二维码
    var btnMyQR: UIButton = UIButton()
    // 启动区域识别功能
    open var isOpenInterestRect = false

    // 识别码的类型
    public var arrayCodeType: [AVMetadataObject.ObjectType]?

    // 是否需要识别后的当前图像
    public var isNeedCodeImage = false

    // 相机启动提示文字
    public var readyString: String! = "loading"

    open override func viewDidLoad() {
        super.viewDidLoad()
        print("到LBXScanViewController的viewDidLoad")
        // Do any additional setup after loading the view.
        //begin back键的添加
//        self.navigationItem.hidesBackButton = true
        self.navigationController?.navigationBar.isHidden = false;//隐藏导航
        //end
        // [self.view addSubview:_qRScanView];
        view.backgroundColor = UIColor.black
        edgesForExtendedLayout = UIRectEdge(rawValue: 0)
    }
    override open func viewWillAppear(_ animated: Bool) {
        print("viewWillAppear")
        super.viewWillAppear(animated)
        // Hide the navigation bar for current view controller
        self.navigationController?.navigationBar.isHidden = false;//隐藏导航
    }
    open func setNeedCodeImage(needCodeImg: Bool) {
        isNeedCodeImage = needCodeImg
    }
    // 设置框内识别
    open func setOpenInterestRect(isOpen: Bool) {
        isOpenInterestRect = isOpen
    }

    open override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        drawScanView()
        perform(#selector(LBXScanViewController.startScan), with: nil, afterDelay: 0.3)
        drawBottomItems()
        
    }
    func drawBottomItems() {
        if (bottomItemsView != nil) {
            
            return
        }
        
        let yMax = self.view.frame.maxY - self.view.frame.minY
        
        bottomItemsView = UIView(frame: CGRect(x: 0.0, y: yMax-100, width: self.view.frame.size.width, height: 100 ) )
        
        bottomItemsView!.backgroundColor = UIColor(red: 0.0, green: 0.0, blue: 0.0, alpha: 0.6)
        
        self.view .addSubview(bottomItemsView!)
        
        let size = CGSize(width: 65, height: 87)
        
        self.btnFlash = UIButton()
        btnFlash.bounds = CGRect(x: 0, y: 0, width: size.width, height: size.height)
        btnFlash.center = CGPoint(x: bottomItemsView!.frame.width/2, y: bottomItemsView!.frame.height/2)
        
        btnFlash.setImage(UIImage(named: "qrcode_scan_btn_flash_nor"), for:UIControl.State.normal)
        btnFlash.addTarget(self, action: #selector(LBXScanViewController.openOrCloseFlash), for: UIControl.Event.touchUpInside)
        //关闭按钮 begin
        self.btnClosePresent = UIButton()
        btnClosePresent.bounds = CGRect(x: 0, y: 0, width: size.width, height: size.height)
        btnClosePresent.center = CGPoint(x: bottomItemsView!.frame.width, y: 0)
        
        btnClosePresent.setImage(UIImage(named: "qrcode_scan_btn_flash_nor"), for:UIControl.State.normal)
        btnClosePresent.addTarget(self, action: #selector(LBXScanViewController.closeModal), for: UIControl.Event.touchUpInside)
        //关闭按钮 end
        
        self.btnPhoto = UIButton()
        btnPhoto.bounds = btnFlash.bounds
        btnPhoto.center = CGPoint(x: bottomItemsView!.frame.width/4, y: bottomItemsView!.frame.height/2)
        btnPhoto.setImage(UIImage(named: "qrcode_scan_btn_photo_nor"), for: UIControl.State.normal)
        btnPhoto.setImage(UIImage(named: "qrcode_scan_btn_photo_down"), for: UIControl.State.highlighted)
        //        btnPhoto.addTarget(self, action: Selector(("openPhotoAlbum")), for: UIControlEvents.touchUpInside)
        btnPhoto.addTarget(self, action: #selector(openPhotoAlbum), for: UIControl.Event.touchUpInside)
        
        self.btnMyQR = UIButton()
        btnMyQR.bounds = btnFlash.bounds;
        btnMyQR.center = CGPoint(x: bottomItemsView!.frame.width * 3/4, y: bottomItemsView!.frame.height/2);
        btnMyQR.setImage(UIImage(named: "qrcode_scan_btn_myqrcode_nor"), for: UIControl.State.normal)
        btnMyQR.setImage(UIImage(named: "qrcode_scan_btn_myqrcode_down"), for: UIControl.State.highlighted)
        btnMyQR.addTarget(self, action: #selector(myCode), for: UIControl.Event.touchUpInside)
        
        //只开放灯光 其他不靠谱 k
        bottomItemsView?.addSubview(btnFlash)
//        bottomItemsView?.addSubview(btnClosePresent)
//        bottomItemsView?.addSubview(btnPhoto)
//        bottomItemsView?.addSubview(btnMyQR)
        
        view.addSubview(bottomItemsView!)
    }
    //退出当前弹层
    @objc func closeModal() {
        self.dismiss(animated: true, completion:nil)//关闭
    }
    //开关闪光灯
    @objc func openOrCloseFlash() {
        scanObj?.changeTorch()
        isOpenedFlash = !isOpenedFlash
        if isOpenedFlash
        {
            btnFlash.setImage(UIImage(named: "qrcode_scan_btn_flash_down"), for:UIControl.State.normal)
        }
        else
        {
            btnFlash.setImage(UIImage(named: "qrcode_scan_btn_flash_nor"), for:UIControl.State.normal)

        }
    }
    @objc func myCode() {
        let vc = ViewController()
        self.navigationController?.pushViewController(vc, animated: true)
    }
    @objc open func startScan() {
        if scanObj == nil {
            var cropRect = CGRect.zero
            if isOpenInterestRect {
                cropRect = LBXScanView.getScanRectWithPreView(preView: view, style: scanStyle!)
            }

            // 指定识别几种码
            if arrayCodeType == nil {
                arrayCodeType = [AVMetadataObject.ObjectType.qr as NSString,
                                 AVMetadataObject.ObjectType.ean13 as NSString,
                                 AVMetadataObject.ObjectType.code128 as NSString] as [AVMetadataObject.ObjectType]
            }

            scanObj = LBXScanWrapper(videoPreView: view,
                                     objType: arrayCodeType!,
                                     isCaptureImg: isNeedCodeImage,
                                     cropRect: cropRect,
                                     success: { [weak self] (arrayResult) -> Void in
                                         guard let strongSelf = self else {
                                             return
                                         }
                                         // 停止扫描动画
                                         strongSelf.qRScanView?.stopScanAnimation()
                                         strongSelf.handleCodeResult(arrayResult: arrayResult)
            })
        }

        // 结束相机等待提示
        qRScanView?.deviceStopReadying()

        // 开始扫描动画
        qRScanView?.startScanAnimation()

        // 相机运行
        scanObj?.start()
    }
    
    open func drawScanView() {
        if qRScanView == nil {
            qRScanView = LBXScanView(frame: view.frame, vstyle: scanStyle!)
            view.addSubview(qRScanView!)
            delegate?.drawwed()
        }
        qRScanView?.deviceStartReadying(readyStr: readyString)
    }
   

    /**
     处理扫码结果，如果是继承本控制器的，可以重写该方法,作出相应地处理，或者设置delegate作出相应处理
     */
    open func handleCodeResult(arrayResult: [LBXScanResult]) {
        guard let delegate = scanResultDelegate else {
            fatalError("you must set scanResultDelegate or override this method without super keyword")
        }
        navigationController?.popViewController(animated: true)
        if let result = arrayResult.first {
            delegate.scanFinished(scanResult: result, error: nil)
        } else {
            let result = LBXScanResult(str: nil, img: nil, barCodeType: nil, corner: nil)
            delegate.scanFinished(scanResult: result, error: "no scan result")
        }
    }
    
    open override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
              // Show the navigation bar on other view controllers
         self.navigationController?.navigationBar.isHidden = false;//隐藏导航
        NSObject.cancelPreviousPerformRequests(withTarget: self)
        qRScanView?.stopScanAnimation()
        scanObj?.stop()
    }
    
    @objc open func openPhotoAlbum() {
        self.dismiss(animated: true, completion:nil)//关闭
//        LBXPermissions.authorizePhotoWith { [weak self] _ in
//            let picker = UIImagePickerController()
//            picker.sourceType = UIImagePickerController.SourceType.photoLibrary
//            picker.delegate = self
//            picker.allowsEditing = true
//            self?.present(picker, animated: true, completion: nil)
//        }
    }
}

//MARK: - 图片选择代理方法
extension LBXScanViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    //MARK: -----相册选择图片识别二维码 （条形码没有找到系统方法）
    public func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
        picker.dismiss(animated: true, completion: nil)
        
        let editedImage = info[UIImagePickerController.InfoKey.editedImage] as? UIImage
        let originalImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage
        guard let image = editedImage ?? originalImage else {
            showMsg(title: nil, message: NSLocalizedString("Identify failed", comment: "Identify failed"))
            return
        }
        let arrayResult = LBXScanWrapper.recognizeQRImage(image: image)
        if !arrayResult.isEmpty {
            handleCodeResult(arrayResult: arrayResult)
        }
    }
    
}

//MARK: - 私有方法
private extension LBXScanViewController {
    
    func showMsg(title: String?, message: String?) {
        let alertController = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        let alertAction = UIAlertAction(title: NSLocalizedString("OK", comment: "OK"), style: .default, handler: nil)
        alertController.addAction(alertAction)
        present(alertController, animated: true, completion: nil)
    }
    
}
