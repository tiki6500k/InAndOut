// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
const DEFAULT_ENABLE_DAY_OF_WEEK = [1, 2, 3, 4, 5];
const MORNING_START_HOURS = 9;
const MORNING_START_MINUTES = 25;
const MORNING_RANDOM_MINUTES_RANGE = 33;
const EVENING_START_HOURS = 18;
const EVENING_START_MINUTES = 45;
const EVENING_RANDOM_MINUTES_RANGE = 30;
const RANDOM_SECOND_RANGE = 60;
const RANDOM_MILLISECOND_RANGE = 999;


// -----------------------------  -----------------------------
function registAlarmHandler () {
	chrome.alarms.onAlarm.addListener(alarmHandler);
}

function alarmHandler (alarm) {
	var dispatcher = {"daily":dailyWork,
					  "in":inWork,
					  "out":outWork}
	dispatcher[alarm.name]()
}

function inWork () {
	goIn();
}

function outWork () {
	goOut();
}

// -----------------------------  -----------------------------
function refreshBeforeWork () {

	chrome.storage.sync.get("weekday", function(enables) {
		if (undefined == enables.weekday) {
			enabledDaysOfWeek = DEFAULT_ENABLE_DAY_OF_WEEK;
		} else {
			enabledDaysOfWeek = enables.weekday;
		}
		dailyWork();
	})
}

function dailyWork () {

	var nowDate = new Date();

	// check enable
	if (checkEnable(nowDate.getDay())) { 
		return;
	}

	startTomorrowAlarm();

	var nowHours = nowDate.getHours();

	// start in alarm
	if (nowHours < MORNING_START_HOURS) {
		nowDate.setHours(MORNING_START_HOURS);
		nowDate.setMinutes(MORNING_START_MINUTES + Math.floor((Math.random() * MORNING_RANDOM_MINUTES_RANGE))); 
		nowDate.setSeconds(Math.floor((Math.random() * RANDOM_SECOND_RANGE)));	// 0~59
		nowDate.setSeconds(Math.floor((Math.random() * RANDOM_MILLISECOND_RANGE))); // 0~998

		var info = {"name":"in",
					"alarmInfo": {"when":nowDate.getTime()}};

		startAlarm(info);

	}

	// start out alarm
	if (nowHours < EVENING_START_HOURS) {
		nowDate.setHours(EVENING_START_HOURS);
		nowDate.setMinutes(EVENING_START_MINUTES + Math.floor((Math.random() * EVENING_RANDOM_MINUTES_RANGE))); 
		nowDate.setSeconds(Math.floor((Math.random() * RANDOM_SECOND_RANGE)));	// 0~59
		nowDate.setSeconds(Math.floor((Math.random() * RANDOM_MILLISECOND_RANGE))); // 0~998

		var info = {"name":"out",
					"alarmInfo": {"when":nowDate.getTime()}};

		startAlarm(info);

	}
	backupStorage();
}

function checkEnable (dayNumber) {
	if (dayNumber in enabledDaysOfWeek) {
		return true;
	} else {
		return false;
	}
}

function initWeekdayEnable () {
	chrome.storage.sync.set({"weekday":DEFAULT_ENABLE_DAY_OF_WEEK}, function() {
			console.log("weekday initialed")
	});
}

function startTomorrowAlarm () {
	var tomorrowDate = new Date();
	tomorrowDate.setDate(tomorrowDate.getDate() + 1);
	tomorrowDate.setHours(0);
	tomorrowDate.setMinutes(0);
	tomorrowDate.setSeconds(0);
	tomorrowDate.setMilliseconds(0)

	var info = {"name":"daily",
				"alarmInfo": {"when":tomorrowDate.getTime()}}

	startAlarm(info);
}

// {"name":"string name", "alarmInfo":object}
function startAlarm (info) {
	chrome.alarms.create(info.name, info.alarmInfo);
	console.log("added alarm: " + JSON.stringify(info));
	// alert("added alarm: " + JSON.stringify(info));
}

function backupStorage () {
	chrome.alarms.getAll(function(alarms) {
		var plan = {};
		for (var i = 0; i < alarms.length; i++) {
			var alarm = alarms[i];
			plan[alarm.name] = alarm.scheduledTime;
		}

		chrome.storage.sync.set({"alarms":plan, "weekday":enabledDaysOfWeek}, function() {
			console.log("backup done")
		});
	});
}
// -----------------------------  -----------------------------

function main() {
	registAlarmHandler();
	dailyWork();
}


var enabledDaysOfWeek;
chrome.runtime.onInstalled.addListener(function() {
	// retrive checked days first
	enabledDaysOfWeek = DEFAULT_ENABLE_DAY_OF_WEEK;
	chrome.alarms.clearAll();
	chrome.storage.sync.clear();
	main();
});

