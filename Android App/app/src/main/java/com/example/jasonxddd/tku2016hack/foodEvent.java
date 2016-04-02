package com.example.jasonxddd.tku2016hack;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class foodEvent extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_food_event);

        Button Sub = (Button)findViewById(R.id.foodSubmit);
        Sub.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(foodEvent.this, foodChoose.class);
                startActivity(intent);
                finish();
            }
        });
    }
}
