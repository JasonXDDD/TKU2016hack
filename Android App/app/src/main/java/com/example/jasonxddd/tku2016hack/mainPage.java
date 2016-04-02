package com.example.jasonxddd.tku2016hack;

import android.app.Activity;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.sql.Time;
import java.util.Calendar;
import java.util.logging.LogRecord;

public class mainPage extends AppCompatActivity {
    private Handler mHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_page);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mHandler = new Handler(){
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                TimeSet();
            }
        };

        new Thread(new Runnable() {
            @Override
            public void run() {
                try{
                    while (true){
                        Thread.sleep(500);
                        mHandler.sendMessage(new Message());
                    }
                }catch (InterruptedException E){

                }
            }
        }).start();

        TypeChange("rest", "廢廢");
    }


    public void TimeSet(){
        Calendar c = Calendar.getInstance();
        TextView hour = (TextView)findViewById(R.id.hour);
        TextView min = (TextView)findViewById(R.id.min);
        TextView sec = (TextView)findViewById(R.id.sec);

        hour.setText(String.format("%02d", c.get(Calendar.HOUR)));
        min.setText(String .format("%02d",c.get(Calendar.MINUTE)));
        sec.setText(String.format("%02d",c.get(Calendar.SECOND)));


    }


    public void TypeChange(String type, String name){

        //get
        TextView subject = (TextView)findViewById(R.id.subject);
        Button btn1 = (Button)findViewById(R.id.btn1);
        Button btn2 = (Button)findViewById(R.id.btn2);
        RelativeLayout relativeLayout = (RelativeLayout)findViewById(R.id.mainLayout);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);


        if(type.equals("eating")){
            subject.setText(name);
            btn1.setText("選擇");
            btn2.setText("新地點");

            toolbar.setBackgroundColor(Color.parseColor("#C882FD"));
            relativeLayout.setBackgroundColor(Color.parseColor("#ECD2FF"));
        }

        if(type.equals("class")){
            subject.setText(name);
            btn1.setText("考試");
            btn2.setText("作業");

            toolbar.setBackgroundColor(Color.parseColor("#1DBCD4"));
            relativeLayout.setBackgroundColor(Color.parseColor("#D2F9FF"));
        }

        if(type.equals("rest")){
            subject.setText("休息");
            btn1.setText("耍廢");

            toolbar.setBackgroundColor(Color.parseColor("#E9C108"));
            relativeLayout.setBackgroundColor(Color.parseColor("#FFF7D2"));

            btn1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(getApplicationContext(), "廢", Toast.LENGTH_SHORT).show();
                    finish();
                }
            });

            btn2.setText("睡覺");
            btn2.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(getApplicationContext(), "zzzzzz", Toast.LENGTH_SHORT).show();
                    finish();
                }
            });
        }
    }
}
