package com.example.demo;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.Nullable;

public class MainActivity extends Activity {
    TextView textMyText;
    Button btnChangeColor;
    Button btnReset;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.mainactivity);
        textMyText = findViewById(R.id.textMyText);
        btnChangeColor = findViewById(R.id.btnChangeColor);
        btnReset = findViewById(R.id.btnReset);
        btnChangeColor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                textMyText.setTextColor(getResources().getColor(R.color.black));
                textMyText.setText(getResources().getString(R.string.lbl_hello_android));
            }
        });
        btnReset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                textMyText.setTextColor(getResources().getColor(R.color.white));
                textMyText.setText(getResources().getString(R.string.lbl_hello_world));
            }
        });
    }
}
