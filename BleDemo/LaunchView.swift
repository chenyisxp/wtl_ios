import UIKit
import AVKit
import AVFoundation

class LauchViewController: UIViewController {
    var window: UIWindow?
    override func viewDidLoad() {
        super.viewDidLoad()
        //没有调用启动不了d啊!!!!!!!
        viewDidAppear(true)
    }
    
    var path:String?
   var playerViewController = AVPlayerViewController()
   var playerView = AVPlayer()
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidLoad()
        //1、黑屏
        //定义一个视频文件路径
        let filePath = Bundle.main.path(forResource: "appvideo1", ofType: "mp4")
        let videoURL = URL(fileURLWithPath: filePath!)
        //定义一个playerItem，并监听相关的通知
        let playerItem = AVPlayerItem(url: videoURL)
        NotificationCenter.default.addObserver(self,
                           selector: #selector(playerDidFinishPlaying),
                           name: NSNotification.Name.AVPlayerItemDidPlayToEndTime,
                           object: playerItem)
        //定义一个视频播放器，通过playerItem径初始化
        let player = AVPlayer(playerItem: playerItem)
        //设置大小和位置（全屏）
        let playerLayer = AVPlayerLayer(player: player)
//        playerLayer.videoGravity = AVLayerVideoGravity.resizeAspect;//无效
//        playerLayer.frame = self.view.bounds
        let screenSize: CGRect = UIScreen.main.bounds;
        playerLayer.frame =  CGRect(x: 0, y: 0, width: screenSize.width, height: screenSize.height);
        //全屏去除顶部状态栏
        self.navigationController?.navigationBar.isHidden = true;//隐藏导航栏要不然底部会有空白区域
//        playerLayer.frame = CGRect(x: 0, y: 0, width: UIScreen.main.bounds.size.width, height: UIScreen.main.bounds.size.height)
        //添加到界面上
        self.view.layer.addSublayer(playerLayer)
        //开始播放
        player.play()
        //2、试试
//        super.viewDidLoad()
//        //获取视频路径
//        path = Bundle.main.path(forResource: "app_open", ofType: "mp4")
//        playerView = AVPlayer(url: URL(fileURLWithPath: path!))
//        playerViewController.player = playerView
        
    }

    //视频播放完毕响应
    @objc func playerDidFinishPlaying() {
         print("播放完毕!")//调到主页去
//        let navigationController = UINavigationController(rootViewController: ViewController())
        //清空root
//        if ((self.window?.rootViewController) != nil){
//            self.window?.rootViewController = nil;
//        }
        
//         let vc = ViewController()
         //        把根视图控制器设为导航视图控制器
//        self.window?.rootViewController = ViewController();
        //这种方式才可以扫描页继续往下走 会x影响webpage里的js执行
//        self.navigationController?.pushViewController(vc, animated: true)
//        self.present(vc, animated: true, completion: nil)
//        self.present(vc, animated: true, completion: nil)
         //
        
        let appDelegate = (UIApplication.shared.delegate) as! AppDelegate;
        appDelegate.changeRoorViewFuc();
        return
    }
    //第三种方案
//    var avPlayer: AVPlayer!
//
//
//        //带控制播放器的
//       func playVideo() {
//
//           let filepath: String? = Bundle.main.path(forResource: "appvideo1", ofType: "mp4")
//           let fileURL = URL.init(fileURLWithPath: filepath!)
//
//           avPlayer = AVPlayer(url: fileURL)
//           let avPlayerController = AVPlayerViewController()
//           avPlayerController.player = avPlayer
//           avPlayerController.view.frame = CGRect(x: 0, y: 0, width: UIScreen.main.bounds.size.width, height: UIScreen.main.bounds.size.height)
//
//           // Turn on video controlls
//           avPlayerController.showsPlaybackControls = true
//
//           // play video
//           avPlayerController.player?.play()
//           self.view.addSubview(avPlayerController.view)
//           self.addChild(avPlayerController)
//       }
}
