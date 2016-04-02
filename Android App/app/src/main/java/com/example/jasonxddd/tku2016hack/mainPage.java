package com.example.jasonxddd.tku2016hack;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Calendar;

public class mainPage extends AppCompatActivity {
    private Handler mHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_page);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final RadioButton btn_Class = (RadioButton)findViewById(R.id.btn_class);
        final RadioButton btn_Eating = (RadioButton)findViewById(R.id.btn_eating);
        final RadioButton btn_Rest = (RadioButton)findViewById(R.id.btn_rest);

        mHandler = new Handler(){
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                TimeSet();

                if(btn_Class.isChecked()) TypeChange("class", "微積分");
                if(btn_Eating.isChecked()) TypeChange("eating", "午餐");
                if(btn_Rest.isChecked()) TypeChange("rest", "休息");
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

            btn1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(mainPage.this, foodEvent.class);
                    startActivity(intent);
                }
            });

            btn2.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(mainPage.this, foodNew.class);
                    startActivity(intent);

                }
            });
        }




        if(type.equals("class")){
            subject.setText(name);
            btn1.setText("考試");
            btn2.setText("作業");

            toolbar.setBackgroundColor(Color.parseColor("#1DBCD4"));
            relativeLayout.setBackgroundColor(Color.parseColor("#D2F9FF"));

            btn1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(mainPage.this, classEvent.class);
                    intent.putExtra("type", "quiz");
                    startActivity(intent);
                }
            });

            btn2.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(mainPage.this, classEvent.class);
                    intent.putExtra("type", "homework");
                    startActivity(intent);

                }
            });
        }




        if(type.equals("rest")){
            subject.setText("休息");
            btn1.setText("耍廢");
            btn2.setText("睡覺");

            toolbar.setBackgroundColor(Color.parseColor("#E9C108"));
            relativeLayout.setBackgroundColor(Color.parseColor("#FFF7D2"));

            btn1.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(getApplicationContext(), "廢", Toast.LENGTH_SHORT).show();
                    finish();
                }
            });

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
