package com.example.jasonxddd.tku2016hack;

import android.app.ActionBar;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import java.util.Calendar;

public class classEvent extends AppCompatActivity {

    int Syear, Smonth, Sday, Shour, Sminute;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_class_event);

        Intent intent = getIntent();
        TypeChange(intent.getStringExtra("type"));

        processSetAlarm();

        Button quizTIme = (Button)findViewById(R.id.quizTime);
        quizTIme.setOnClickListener(Clock);

        Button quizSubmit = (Button)findViewById(R.id.quizSubmit);
        quizSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(classEvent.this, mainPage.class);
                startActivity(intent);
                finish();
            }
        });
    }

    public View.OnClickListener Clock = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            processSetAlarm();
        }
    };


    public void TypeChange(String type){
        TextView title = (TextView)findViewById(R.id.Ttitle);
        RelativeLayout relativeLayout = (RelativeLayout)findViewById(R.id.classLayout);

        if(type.equals("quiz")){
            title.setText("考試");
            relativeLayout.setBackgroundColor(Color.parseColor("#FACACA"));
        }

        if(type.equals("homework")){
            title.setText("作業");
            relativeLayout.setBackgroundColor(Color.parseColor("#D3F1FF"));
        }

    }



    private void processSetAlarm() {

        final TextView tyear = (TextView)findViewById(R.id.Tyear);
        final TextView tmon = (TextView)findViewById(R.id.Tmonth);
        final TextView tday = (TextView)findViewById(R.id.Tday);
        final TextView thour = (TextView)findViewById(R.id.Thour);
        final TextView tmin = (TextView)findViewById(R.id.Tmin);

        Calendar c = Calendar.getInstance();
        int Nyear = c.get(Calendar.YEAR),
            Nmonth = c.get(Calendar.MONTH),
            Nday = c.get(Calendar.DAY_OF_MONTH),
            Nhour = c.get(Calendar.HOUR),
            Nminute = c.get(Calendar.MINUTE);

        TimePickerDialog.OnTimeSetListener timeSetListener = new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                        Shour = hourOfDay;
                        Sminute = minute;

                        thour.setText(String.format("%02d", hourOfDay));
                        tmin.setText(String.format("%02d", minute));

                        Toast.makeText(getApplicationContext(), String.format("%d : %d", Shour, Sminute), Toast.LENGTH_SHORT).show();
                    }
                };

        // 選擇時間對話框
        final TimePickerDialog tpd = new TimePickerDialog( classEvent.this, timeSetListener, Nhour, Nminute, false);



        // 設定提醒日期
        DatePickerDialog.OnDateSetListener dateSetListener = new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                        Syear = year;
                        Smonth = monthOfYear + 1;
                        Sday = dayOfMonth;

                        tyear.setText(String.format("%02d", year));
                        tmon.setText(String.format("%02d", monthOfYear + 1));
                        tday.setText(String.format("%02d", dayOfMonth));


                        Toast.makeText(getApplicationContext(), String.format("%d, %d, %d", Syear, Smonth, Sday), Toast.LENGTH_SHORT).show();

                        tpd.show();
                    }
                };

        // 建立與顯示選擇日期對話框
        final DatePickerDialog dpd = new DatePickerDialog( classEvent.this, dateSetListener, Nyear, Nmonth, Nday);
        dpd.show();

    }


}
