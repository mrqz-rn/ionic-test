import Foundation
import Capacitor

@objc(DateTimeSettingsPlugin)
public class DateTimeSettingsPlugin: CAPPlugin {

    @objc func isDateTimeAutomatic(_ call: CAPPluginCall) {
        let timeZone = TimeZone.autoupdatingCurrent.identifier
        let isAutomatic = !NSTimeZone.system.isEqual(NSTimeZone.default)

        call.resolve([
            "isAutomatic": isAutomatic
        ])
    }
}