/*
Name: Arthur Clark
Date: 04/24/2019
Filename: todoList.js 
Description:
- This is the script for creating the task elements
 */

/*
 Function: createTask
 Parameters: None 
 Return Value: false, so as not to refresh the page and blank the tasks
 Description:
 - This function gets the input from the user and creates a dismissible bootstrap task alert that is sized implicitly and which 
 contains the name of the task to complete and the number of days it takes to complete that task. This function also returns false so as not to refresh the page and all validation is done by 
 HTML5's native validation.
 */

function createTask() {
	// The name of the task
	var task = document.getElementById("taskField").value;
	// The number of days to complete the task
	var numDays = document.getElementById("daysField").value;

	// The row div into which task alerts will be placed
	var bodyDiv = document.getElementsByClassName("row")[0];

	// The HTML element that will serve as the bootstrap task alert
	var taskElement = document.createElement("div");

	// String containing taskElement's class
	var classVal = "alert alert-dismissible fade show col-auto ";

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
	taskElement.setAttribute("style", "margin-right: 20px; font-weight: 600;");

	taskButton.setAttribute("type", "button");
	taskButton.setAttribute("class", "close");
	taskButton.setAttribute("data-dismiss", "alert");
	taskButton.setAttribute("aria-label", "Close");

	var spanElement = document.createElement("span");
	spanElement.setAttribute("aria-hidden", "true");
	spanElement.textContent = String.fromCharCode(215);

	taskButton.appendChild(spanElement);
	taskElement.appendChild(taskButton);

	bodyDiv.appendChild(taskElement);
	return false;
}