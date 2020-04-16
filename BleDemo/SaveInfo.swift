//
//  SaveInfo.swift
//  BleDemo
//
//  Created by chenyi on 2020/4/12.
//  Copyright © 2020 Lynx. All rights reserved.
//

import Foundation


//类似于Android的SharedPreferences，
class SaveInfo: NSObject{
    //测试写数据
    func testWrite(options:[String: Any]? = nil) {
        let manager = UserDefaults()
        manager.setValue("zhangsan", forKey: Keys.StrName.rawValue)  //存储字符串
        
        let days = ["Mon","Tues","Weds","Thurs","Fri","Sat","Sun"]
        manager.set(days, forKey: Keys.Array.rawValue)   //存储数组
        
        let age = 20
        manager.set(age, forKey: Keys.IntAge.rawValue)  //存储整型
        
    }
    //测试读数据
    func testRead(options:[String: Any]? = nil) {
        let manager = UserDefaults()
        
        let name: String? = manager.string(forKey: Keys.StrName.rawValue)  //根据关键字取值
        //如果name不是nil则显示name参数的值，为nil时显示??后面的empty name
        print(name ?? "empty name")    //注意name是optional， 可能为nil; 注意??的用法
        
        let array = manager.array(forKey: Keys.Array.rawValue)
        if let noemptyarray = array {    //如果array不空则进入
            for data in noemptyarray {   //遍历数组
                print(data)
            }
        }
        
        let savedAge = manager.integer(forKey: Keys.IntAge.rawValue)
        print(savedAge)  //打印整型
    }
}
//原文链接：https://blog.csdn.net/brycegao321/article/details/53789898
