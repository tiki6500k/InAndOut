const CARD_NUMBER = 160729450

function goIn(onDone) {
	var parameters = {};
    parameters.card_number = CARD_NUMBER;
    parameters.inout = 1;
    System.ExcuteCommand("Index.Index", "Check_InOUT", parameters, function (returnData) {
        onWorkDone("in", returnData);
    });
}

function goOut(onDone) {
	var parameters = {};
    parameters.card_number = CARD_NUMBER;
    parameters.inout = 0;
    System.ExcuteCommand("Index.Index", "Check_InOUT", parameters, function (returnData) {
    	onWorkDone("out", returnData);
    });

}

function goOptions() {
    chrome.runtime.openOptionsPage();
}

// {"msg_code":"0001" for success, and the others for fail, "msg_desc":string data to describe what situation we got}
function onWorkDone (name, returnData) {
    console.log(name + " got response: " + JSON.stringify(returnData));
    // alert(name + " got response: " + JSON.stringify(returnData));
}