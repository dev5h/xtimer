// window.onbeforeunload = function (e) {
//     e = e || window.event;

//     // For IE and Firefox prior to version 4
//     if (e) {
//       e.returnValue = "Any string";
//     }

//     // For Safari
//     return "Any string";
//   };

//Setup Local Storage:

if (
  localStorage.getItem("hr") === null &&
  localStorage.getItem("min") === null &&
  localStorage.getItem("sec") === null
) {
  localStorage.setItem("hr", 0);
  localStorage.setItem("min", 0);
  localStorage.setItem("sec", 0);
}

window.addEventListener("load", function () {
  Notification.requestPermission().then(function (result) {
    console.log(result);
  });
});
