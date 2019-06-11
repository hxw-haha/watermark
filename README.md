# watermark

---html

 全屏水印：参考waterMark01.html调用
 
 ![image](https://github.com/hxw-haha/watermark/raw/master/html/全屏水印.png)
 
 指定区域水印：参考waterMark02.html调用
 
 ![image](https://github.com/hxw-haha/watermark/raw/master/html/指定区域水印.png)


---android

WaterMarkBackgroundView.java 参考链接：https://github.com/fulushan/watermark-android

    View view = getContentView().findViewById(waterMarkViewId());
    view.setAlpha(0.8f);
    view.setBackgroundDrawable(new WaterMarkBackgroundView(
                    getContext(), "王五", -30, 14));
