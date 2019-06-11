import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.drawable.Drawable;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class WaterMarkBackgroundView extends Drawable {

    private Paint paint = new Paint();
    private List<String> labels;
    private Context context;
    /**
     * 角度
     */
    private int degress;
    /**
     * 字体大小 单位sp
     */
    private int fontSize;

    /**
     * 初始化构造
     *
     * @param context  上下文
     * @param userName   用户工号
     * @param degress  水印角度
     * @param fontSize 水印文字大小
     */
    public WaterMarkBackgroundView(Context context, String userName, int degress, int fontSize) {
        this.labels = waterMarkList(userName);
        this.context = context;
        this.degress = degress;
        this.fontSize = fontSize;
    }

    private List<String> waterMarkList(String userName) {
        List<String> labels = new ArrayList<String>();
        labels.add("工号：" + userName);
        // yyyy-MM-dd HH:mm:ss
        labels.add("日期：" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        labels.add("不可扩散");
        return labels;
    }

    @Override
    public void draw(Canvas canvas) {

        int width = getBounds().right;
        int height = getBounds().bottom;

        canvas.drawColor(Color.parseColor("#40F3F5F9"));
        paint.setColor(Color.parseColor("#50AEAEAE"));

        paint.setAntiAlias(true);
        paint.setTextSize(sp2px(context, fontSize));
        canvas.save();
        canvas.rotate(degress);
        float textWidth = paint.measureText(labels.get(0));
        int index = 0;
        for (int positionY = height / 10; positionY <= height; positionY += height / 10 + 80) {
            float fromX = -width + (index++ % 2) * textWidth;
            for (float positionX = fromX; positionX < width; positionX += textWidth * 2) {
                //间距
                int spacing = 0;
                for (String label : labels) {
                    canvas.drawText(label, positionX, positionY + spacing, paint);
                    spacing = spacing + 50;
                }
            }
        }
        canvas.restore();
    }


    @Override
    public void setAlpha(int alpha) {
        // from = 0, to = 255
    }

    @Override
    public void setColorFilter(ColorFilter colorFilter) {

    }

    @Override
    public int getOpacity() {
        return PixelFormat.UNKNOWN;
    }

    public static int sp2px(Context context, float spValue) {
        final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (spValue * fontScale + 0.5f);
    }

}
