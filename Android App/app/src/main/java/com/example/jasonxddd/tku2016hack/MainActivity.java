package com.example.jasonxddd.tku2016hack;

import android.app.Activity;
import android.content.Intent;
<<<<<<< Updated upstream
import android.content.res.Resources;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
=======
>>>>>>> Stashed changes
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.RelativeLayout;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        //Remove title bar
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        //Remove notification bar
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        Button login = (Button) findViewById(R.id.login);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, mainPage.class);

                Intent intent = new Intent(MainActivity.this, Main2Activity.class);

                startActivity(intent);
                finish();
            }
        });


        RelativeLayout relativeLayout = (RelativeLayout)findViewById(R.id.my_Layout);
        Resources res = this.getResources();
        Drawable drawable;


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            drawable = res.getDrawable(R.drawable.login, getTheme());
            relativeLayout.setBackground(drawable);
        } else {
            drawable = res.getDrawable(R.drawable.login);
            relativeLayout.setBackgroundDrawable(drawable);
        }

    }


}
