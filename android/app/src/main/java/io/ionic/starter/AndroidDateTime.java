package io.ionic.starter;

import android.content.ContentResolver;
import android.provider.Settings;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

public class AndroidDateTime extends Plugin {

    @PluginMethod
    public void getDateTimeSetting(PluginCall call) {
        ContentResolver resolver = getActivity().getContentResolver();
        int autoTime = Settings.Global.getInt(resolver, Settings.Global.AUTO_TIME, 0);
        int autoTimeZone = Settings.Global.getInt(resolver, Settings.Global.AUTO_TIME_ZONE, 0);

        JSObject result = new JSObject();
        result.put("autoTime", autoTime == 1); // 1 if automatic, 0 if manual
        result.put("autoTimeZone", autoTimeZone == 1);

        call.resolve(result);
    }
}
