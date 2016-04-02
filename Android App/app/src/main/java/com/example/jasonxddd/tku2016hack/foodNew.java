package com.example.jasonxddd.tku2016hack;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class foodNew extends AppCompatActivity {

    boolean flag = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_food_new);



        Button newGroup = (Button)findViewById(R.id.loc_addGroup);
        newGroup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                flag = !flag;
                if (flag) changeToGroup();
                else changeToStore();
            }
        });

        Button submit = (Button)findViewById(R.id.loc_submit);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(foodNew.this, mainPage.class);
                startActivity(intent);
                finish();
            }
        });
    }

    public void changeToGroup(){
        TextView title = (TextView)findViewById(R.id.loc_title);
        TextView show1 = (TextView)findViewById(R.id.loc_show1);
        TextView show2 = (TextView)findViewById(R.id.loc_show2);
        TextView show3 = (TextView)findViewById(R.id.loc_show3);
        TextView show4 = (TextView)findViewById(R.id.loc_show4);
        EditText cost = (EditText)findViewById(R.id.loc_cost);
        EditText group = (EditText)findViewById(R.id.loc_group);
        EditText type = (EditText)findViewById(R.id.loc_type);
        EditText satisfy = (EditText)findViewById(R.id.loc_satisfy);

        Button addGroup = (Button)findViewById(R.id.loc_addGroup);

        title.setText("新地方");
        addGroup.setText("我想加新店家");

        show1.setVisibility(View.INVISIBLE);
        show2.setVisibility(View.INVISIBLE);
        show3.setVisibility(View.INVISIBLE);
        show4.setVisibility(View.INVISIBLE);
        cost.setVisibility(View.INVISIBLE);
        group.setVisibility(View.INVISIBLE);
        type.setVisibility(View.INVISIBLE);
        satisfy.setVisibility(View.INVISIBLE);
    }

    public void changeToStore(){
        TextView title = (TextView)findViewById(R.id.loc_title);
        TextView show1 = (TextView)findViewById(R.id.loc_show1);
        TextView show2 = (TextView)findViewById(R.id.loc_show2);
        TextView show3 = (TextView)findViewById(R.id.loc_show3);
        TextView show4 = (TextView)findViewById(R.id.loc_show4);
        EditText cost = (EditText)findViewById(R.id.loc_cost);
        EditText group = (EditText)findViewById(R.id.loc_group);
        EditText type = (EditText)findViewById(R.id.loc_type);
        EditText satisfy = (EditText)findViewById(R.id.loc_satisfy);

        Button addGroup = (Button)findViewById(R.id.loc_addGroup);

        title.setText("新店家");
        addGroup.setText("我想去新地方");

        show1.setVisibility(View.VISIBLE);
        show2.setVisibility(View.VISIBLE);
        show3.setVisibility(View.VISIBLE);
        show4.setVisibility(View.VISIBLE);
        cost.setVisibility(View.VISIBLE);
        group.setVisibility(View.VISIBLE);
        type.setVisibility(View.VISIBLE);
        satisfy.setVisibility(View.VISIBLE);
    }
}
