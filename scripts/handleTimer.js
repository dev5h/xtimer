var TIMER_STATUS = "";
function minTwoDigits(n) {
  return (n < 10 ? "0" : "") + n;
}
function toSec(arr) {
  let x = arr[0] * 3600 + arr[1] * 60 + arr[2];
  return x;
}
function reset_timeline() {
  localStorage.setItem("hr", 0);
  localStorage.setItem("min", 0);
  localStorage.setItem("sec", 0);
}

function mainLoop() {
  let timer = new easytimer.Timer();

  timer.addEventListener("secondsUpdated", function (e) {
    document.title = timer.getTimeValues().toString() + " - t2S";

    document.querySelector(".timer_area").innerHTML = timer.getTimeValues().toString();
    if (
      timer.getTimeValues().hours > 0 &&
      timer.getTimeValues().seconds == 0 &&
      timer.getTimeValues().minutes == 0
    ) {
      sfx_interval.play();
      let txt =
        "Yo Bro " +
        timer.getTimeValues().hours +
        " hr passed! Wanna Chill? 😎🔥";
      var notification = new Notification("T2S", {
        body: txt,
        icon: "assets/clock.png",
      });
    }

    localStorage.setItem("hr", timer.getTimeValues().hours);
    localStorage.setItem("min", timer.getTimeValues().minutes);
    localStorage.setItem("sec", timer.getTimeValues().seconds);
  });
  function handle_play_pause() {
    if (TIMER_STATUS == "") {
      if (
        localStorage.getItem("hr") != 0 ||
        localStorage.getItem("min") != 0 ||
        localStorage.getItem("sec") != 0
      ) {
        console.log(
          toSec([
            parseInt(localStorage.getItem("hr")),
            parseInt(localStorage.getItem("min")),
            parseInt(localStorage.getItem("sec")),
          ])
        );
        timer.start({
          precision: "seconds",
          startValues: {
            seconds: toSec([
              parseInt(localStorage.getItem("hr")),
              parseInt(localStorage.getItem("min")),
              parseInt(localStorage.getItem("sec")),
            ]),
          },
        });
        play_pause_btn.innerHTML = "Pause";
        TIMER_STATUS = "playing";
        sfx_play.play();
      } else {
        timer.start();
        play_pause_btn.innerHTML = "Pause";
        TIMER_STATUS = "playing";
        sfx_play.play();
      }
    } else if (TIMER_STATUS == "playing") {
      timer.pause();
      TIMER_STATUS = "paused";
      play_pause_btn.innerHTML = "Play";
      sfx_play.play();
    } else if (TIMER_STATUS == "paused") {
      timer.start();
      TIMER_STATUS = "playing";
      play_pause_btn.innerHTML = "Pause";
      sfx_play.play();
    }
  }

  play_pause_btn.addEventListener("click", function () {
    handle_play_pause();
  });

  //Spacebar HAndler
  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      handle_play_pause();
    }
  };

  function handle_reset_btn() {
    timer.stop();
    reset_timeline();
    TIMER_STATUS = "";
    document.querySelector(".timer_area").innerHTML = "00:00:00";
  }

  reset_btn.addEventListener("click", function () {
    handle_reset_btn();
  });

  if (
    localStorage.getItem("hr") != 0 ||
    localStorage.getItem("min") != 0 ||
    localStorage.getItem("sec") != 0
  ) {
    document.querySelector(".pop-ttl").innerHTML = `
    
       Backup Found of ${minTwoDigits(
          localStorage.getItem("hr")
        )}:${minTwoDigits(localStorage.getItem("min"))}:${minTwoDigits(
      localStorage.getItem("sec")
    )}        
        
        `;
    darksec.style.display = "block";
    pop_start_over.addEventListener("click", function () {
      reset_timeline();
      darksec.style.display = "none";
      mainLoop();
    });
    pop_resume.addEventListener("click", function () {
      document.querySelector(".timer_area").innerHTML = `${minTwoDigits(
        localStorage.getItem("hr")
      )}:${minTwoDigits(localStorage.getItem("min"))}:${minTwoDigits(
        localStorage.getItem("sec")
      )} `;
      darksec.style.display = "none";
    });
  }
}

mainLoop();
