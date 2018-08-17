
// -----------------------------  -----------------------------
// checkbox click behavior
function onCheckboxCliecked (checkbox) {
  console.log("name: " + checkbox.name + " check: " + checkbox.checked);
  if (checkbox.checked) {
    addToEnableDaysOfWeekWithValue(checkbox.value);
  } else {
    removeFromEnableDaysOfWeekWithValue(checkbox.value);
  }
  syncEnabledDaysOfWeek({"weekday": enabledDaysOfWeek});
}

function removeFromEnableDaysOfWeekWithValue (value) {
  enabledDaysOfWeek = enabledDaysOfWeek.filter(function(item) { 
    return item != value;
  });
}

function addToEnableDaysOfWeekWithValue (value) {
  enabledDaysOfWeek.push(value);
}

// -----------------------------  -----------------------------
function syncEnabledDaysOfWeek(setting) {
  if (isWaitForSync) { 
    return; 
  }
  chrome.storage.sync.set(setting, function() {
    console.log("sync EnabledDaysOfWeek done");
    if (isWaitForSync) {
      isWaitForSync = false;
      syncEnabledDaysOfWeek;
    }
  });
  isWaitForSync = true;
}

function retriveEnabledDaysOfWeek (afterFunc) {
  chrome.storage.sync.get("weekday", function(setting) {
    enabledDaysOfWeek = setting.weekday;
    afterFunc();
  });
}

function updateAllChecked () {
  for (var i = 0; i < enabledDaysOfWeek.length; i++) {
    updateTrueCheckedWithPartialId(enabledDaysOfWeek[i]);
  }
}

function updateTrueCheckedWithPartialId (partialId) {
  let elementId = "weekday_" + partialId;
  let checkbox = document.getElementById(elementId);
  checkbox.checked = true;
}

// -----------------------------  -----------------------------
function letCheckboxReady () {
  // regist click handler
  for (var ix = 0; ix <= 6; ix++) {
    let elementId = "weekday_" + ix;
    var checkbox = document.getElementById(elementId);
    checkbox.addEventListener("click", function() {
      onCheckboxCliecked(this);
    });
    // set false checked by default
    checkbox.checked = false;
  }

  // use setting from storage to update all checked
  updateAllChecked();
}

function main () {
  letCheckboxReady();
}

var enabledDaysOfWeek;
var isWaitForSync = false;
// regist on content ready
document.addEventListener('DOMContentLoaded', function () {
  retriveEnabledDaysOfWeek(function() {
    main();
  })
});