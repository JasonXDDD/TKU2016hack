package com.example.jasonxddd.tku2016hack;

import android.os.AsyncTask;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.os.AsyncTask;
import android.widget.TextView;

/**
 * Created by JasonXDDD on 2016/4/3.
 */
public class connect extends AsyncTask<TextView, Void, String>
{
    TextView textView;

    @Override
    protected String doInBackground(TextView... params)
    {
        this.textView = params[0];
        BufferedReader inBuffer = null;
        String url = "http://192.168.40.143/user/login";
        String result = "fail";
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpPost request = new HttpPost(url);
            List<NameValuePair> postParameters =
                    new ArrayList<NameValuePair>();
            postParameters.add(new BasicNameValuePair("email", "e"));
            postParameters.add(new BasicNameValuePair("password", "e"));
            //postParameters.add(new BasicNameValuePair("answer", "11"));
            UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(
                    postParameters);

            request.setEntity(formEntity);
            HttpResponse httpResponse = httpClient.execute(request);
            inBuffer = new BufferedReader(
                    new InputStreamReader(
                            httpResponse.getEntity().getContent()));

            StringBuffer stringBuffer = new StringBuffer("");
            String line = "";
            String newLine = System.getProperty("line.separator");
            while ((line = inBuffer.readLine()) != null) {
                stringBuffer.append(line + newLine);
            }
            inBuffer.close();

            result = stringBuffer.toString();

        } catch(Exception e) {
            // Do something about exceptions
            result = e.getMessage();
        } finally {
            if (inBuffer != null) {
                try {
                    inBuffer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }


    protected void onPostExecute(String page)
    {
        textView.setText(page);
    }
}
