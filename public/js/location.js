//pk.88138d2dfad1d7de5dd74db58f38add4

const state = document.getElementById("state");
const form = document.getElementById("form");
const input = document.querySelector(".submit");

input.addEventListener("click", function (e) {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const { latitude, longitude } = pos.coords;
        const request = new XMLHttpRequest();
        request.open(
          "GET",
          `https://us1.locationiq.com/v1/reverse.php?key=pk.88138d2dfad1d7de5dd74db58f38add4&lat=${latitude}&lon=${longitude}&format=json`,
          true
        );
        request.send();

        request.addEventListener("load", function () {
          if (request.readyState == 4 && request.status == 200) {
            const response = JSON.parse(request.responseText);
            state.value = response.address.state;
            form.submit();
          }
        });
      },

      function (err) {
        console.warn(err);
      }
    );
  }
});
