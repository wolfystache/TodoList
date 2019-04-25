/*
Name: Arthur Clark
Date: 04/24/2019
Filename: todoList.js 
Description:
- This is the script for setting up the minimum date to be tomorrow and creating the task elements
 */

// One day in milliseconds
var dayMS = 1000 * 24 * 60 * 60;


/*
 Function: setDate
 Parameters: None 
 Return Value: none
 Description:
 - This function sets up the minimum allowed date for the date input element. 
 */
function setDate() {
	var dateElement = document.getElementById("daysField");
	var date = new Date();
	// Set min time to tomorrow. Setting tomorrow via setTime avoids having to check day/month/year overflow
	date.setTime(date.getTime() + dayMS);

	//Concatenate 'min' date string
	var min = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate();
	dateElement.setAttribute("min", min);
}
/*
 Function: createTask
 Parameters: None 
 Return Value: false, so as not to refresh the page and blank the tasks
 Description:
 - This function gets the input from the user and creates a dismissible bootstrap task alert that is sized implicitly and which 
 contains the name of the task to complete and the number of days it takes to complete that task. The number of days is 
 calculated by subtracting the inputted date by the current date, using the Date object's time getter and setters. 
 When a task is created, the number of days till completion is saved as the property 'numDays.' The task is inserted 
 right before another element that has a higher 'numDays' value, or at the end of this list if no such element exists,
 so as sort the tasks by 'numDays.' This function also returns false so as not to refresh the page and all validation is done by 
 HTML5's native validation.
 */
function createTask() {
	// The name of the task
	var task = document.getElementById("taskField").value;
	// The date the task must be completed by
	var dateElement = document.getElementById("daysField");

	// The row div into which task alerts will be placed
	var bodyDiv = document.getElementsByClassName("row")[0];

	// The HTML element that will serve as the bootstrap task alert
	var taskElement = document.createElement("div");

	//Array containing completion date componenets
	var dateArr = dateElement.value.split("-");

	var currentDate = new Date();
	// Entered date converted to Date object
	var enteredDated = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);


	//The number of days until the completion day is reached
	var numDays = Math.ceil((enteredDated.getTime() - currentDate.getTime()) / (dayMS)); 

	// String containing taskElement's class
	var classVal = "alert alert-dismissible fade show col-xl-auto col-lg-auto col-md-auto col-sm-auto ";

	// Switch background color on the number of days till completio.
	if (numDays < 3) {
		classVal += "alert-danger";
	}
	else if (numDays < 7) {
		classVal += "alert-warning";
	}
	else {
		classVal += "alert-secondary";
	}
	taskElement.setAttribute("class", classVal);
	taskElement.setAttribute("role", "alert");
	taskElement.innerHTML = task + "<br />" + numDays + " day(s)";

	// 'x' button for task dismissal 
	var taskButton = document.createElement("button"); 
	taskElement.setAttribute("style", "margin-right: 10px"); 

	taskButton.setAttribute("type", "button");
	taskButton.setAttribute("class", "close"); 
	taskButton.setAttribute("data-dismiss", "alert");
	taskButton.setAttribute("aria-label", "Close");

	var spanElement = document.createElement("span"); 
	spanElement.setAttribute("aria-hidden", "true");
	spanElement.textContent = String.fromCharCode(215);

	taskButton.appendChild(spanElement);
	taskElement.appendChild(taskButton); 

	//Add numDays property to taskElement for correct order
	taskElement.numDays = numDays;

	// Determine where to place task alert so as to enforce order
	for (var i = 0; i < bodyDiv.children.length; i++) {
		console.log(bodyDiv.children[i].numDays);
		if (bodyDiv.children[i].numDays > numDays) {
			
			bodyDiv.insertBefore(taskElement, bodyDiv.children[i]);
			return false;
		}
	}
	bodyDiv.appendChild(taskElement);
	return false;
}