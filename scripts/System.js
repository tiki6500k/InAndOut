var System = {};
var Form = {};
this.System.ExcuteCommand = function (handlerName, method, parameter, AsyncCallback) {
    if (parameter == null || parameter == undefined) {

        parameter = {};

    }

    System.WebServices(handlerName, method, parameter, function (data) {
        if (AsyncCallback != undefined)
            AsyncCallback(data);

    });
};

this.System.WebServices = function (handlerName, method, parameter, AsyncCallback) {
    parameter.handlerName = handlerName;
    parameter.method = method;
    //parameter.language = System.currentLanguage;
    $.ajax({
        cache: false,
        type: "POST",
        url: "http://tpehrweb.tutorabc.com/TIMG_inout/form/SystemHttp.json",
        data: parameter,
        dataType: "json",
        async: false,
        error: function (request) {
            alert("error");
            debugger;
        },
        success: function (data) {
            if (AsyncCallback != undefined) {
                AsyncCallback(data);
            }
        }

    });
};


/*this.System.currentLanguage = "zh-cn";

this.System.ElementType = {};
this.System.ElementType.label = 0;
this.System.ElementType.textbox = 1;
this.System.ElementType.kendoComboBox = 2;
this.System.ElementType.kendoDatePicker = 3;
this.System.ElementType.kendoTimePicker = 4;
this.System.ElementType.kendoDateTimePicker = 5;
this.System.ElementType.kendoNumericTextBox = 6;
this.System.ElementType.RadioButton = 7;
this.System.ElementType.kendoMultiSelect = 8;
this.System.ElementType.textarea = 9;*/
