function onTaskExecuteCheckDocTask(routeStage) {
  debugger;
  var command;
  if (routeStage.executionResult == "executed") {
    command = "CompleteTask";
  } else {
    command = "RejectTask";
  }
  if (routeStage.executionResult != "rejected") {
    var regStatus = EdocsApi.getAttributeValue("regStatus");
    if (regStatus.value != "Зареєстрований") {
      throw "Спочатку зареєструйте документ, а потім виконуйте завдання!";
    }
  }
  sendAnswerToExtSys(routeStage, command);
}
//#endregion

function sendAnswerToExtSys(routeStage, command) {
  debugger;
  var taskComment = "";

  if (command == "CompleteTask") {
    taskComment = "Ваш запит прийнято та зареєстровано за № " + EdocsApi.getAttributeValue("RegNumber").value + " від " + moment(new Date(EdocsApi.getAttributeValue("RegDate").value)).format("DD.MM.YYYY");
  } else {
    taskComment = routeStage.comment;
  }
}
