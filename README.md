# watermark

---html

 全屏水印：waterMark01.html
 
 ![image](https://github.com/hxw-haha/watermark/raw/master/html/全屏水印.png)
 
 指定区域水印：waterMark02.html
 
 ![image](https://github.com/hxw-haha/watermark/raw/master/html/指定区域水印.png)


---android

WaterMarkBackgroundView.java 参考链接：https://github.com/fulushan/watermark-android

    View view = getContentView().findViewById(waterMarkViewId());
    view.setAlpha(0.8f);
    view.setBackgroundDrawable(new WaterMarkBackgroundView(
                    getContext(), "王五", -30, 14));
