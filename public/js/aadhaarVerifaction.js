const aadhaar = document.getElementById("aadhaar");
const aadhaar2 = document.getElementById("coaadhaar");
const submit = document.getElementById("button");
const form = document.getElementById("form");
const verify = document.getElementById("verify");
const spinner = document.getElementById("spinner");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  spinner.classList.add("spinner-border");
  verify.textContent = "Verifying.....";
  const encodedParams = new URLSearchParams();
  encodedParams.append("txn_id", "17c6fa41-778f-49c1-a80a-cfaf7fae2fb8");
  encodedParams.append("consent", "Y");
  encodedParams.append("uidnumber", `${aadhaar.value}`);
  encodedParams.append("clientid", "222");
  encodedParams.append("method", "uidvalidatev2");

  const options = {
    method: "POST",
    url: "https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "c8484aef39msh7b6baa3d32b50e2p172cd3jsnb94d0ee745ca",
      "X-RapidAPI-Host": "verifyaadhaarnumber.p.rapidapi.com",
    },
    data: encodedParams,
  };

  axios
    .request(options)
    .then(function (response) {
      if (response.data.hasOwnProperty("Succeeded")) {
        const encodedParams = new URLSearchParams();
        encodedParams.append("txn_id", "17c6fa41-778f-49c1-a80a-cfaf7fae2fb8");
        encodedParams.append("consent", "Y");
        encodedParams.append("uidnumber", `${aadhaar2.value}`);
        encodedParams.append("clientid", "222");
        encodedParams.append("method", "uidvalidatev2");

        const options = {
          method: "POST",
          url: "https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "c8484aef39msh7b6baa3d32b50e2p172cd3jsnb94d0ee745ca",
            "X-RapidAPI-Host": "verifyaadhaarnumber.p.rapidapi.com",
          },
          data: encodedParams,
        };
        axios.request(options).then(function (response) {
          if (response.data.hasOwnProperty("Succeeded")) {
            removeSpinner();
            form.submit();
          } else {
            if (
              !alert(
                "Your coapplicant aadhaar number is invalid. Enter the aadhaar details again."
              )
            ) {
              removeSpinner();
            }
          }
        });
      } else {
        if (
          !alert(
            "Your aadhaar number is invalid. Enter the aadhaar details again."
          )
        ) {
          removeSpinner();
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});
function removeSpinner() {
  spinner.classList.remove("spinner-border");
  verify.textContent = "";
}
