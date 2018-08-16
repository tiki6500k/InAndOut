function goIn(onDone) {
	var parameters = {};
    parameters.card_number = 1034452;
    parameters.inout = 1;
    System.ExcuteCommand("Index.Index", "Check_InOUT", parameters, function (returnData) {
        onDone("in", returnData);
    });
}

function goOut(onDone) {
	var parameters = {};
    parameters.card_number = 103060901884;
    parameters.inout = 0;
    System.ExcuteCommand("Index.Index", "Check_InOUT", parameters, function (returnData) {
    	onDone("out", returnData);
    });

}