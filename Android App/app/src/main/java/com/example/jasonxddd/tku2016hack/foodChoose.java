package com.example.jasonxddd.tku2016hack;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class foodChoose extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_food_choose);

        Button yes = (Button)findViewById(R.id.yes);
        yes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(foodChoose.this, mainPage.class);
                startActivity(intent);
                finish();
            }
        });


        Button no = (Button)findViewById(R.id.no);
        no.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(foodChoose.this, foodEvent.class);
                startActivity(intent);
                finish();
            }
        });

        Button nnew = (Button)findViewById(R.id.nnew);
        nnew.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(foodChoose.this, foodNew.class);
                startActivity(intent);
                finish();
            }
        });
    }
}
