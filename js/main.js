$(".country__button").on("click", function (event) {
  event.preventDefault();

  $(".loader__bg").addClass("is-active");

  let countryName = $(".country__input").val();
  if (countryName !== "") {
    clear();
    $(".borders").text("");
    findCountry(countryName);
  } else {
    alert("Enter name of country, please");
    $(".loader__bg").removeClass("is-active");
  }
});

let clear = function () {
  $(".table-country").addClass("loading");
  $(".country__input").val("");
};

let findCountry = function (countryName) {
  axios
    .get(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
      $(".loader__bg").addClass("is-active");
      response = response.data[0];
      $(".country-flag").html(`<img
      class="img-fluid img-thumbnail"
      src="${response.flags.svg}"
      alt=""
    />
    <div
                class="card-body d-flex align-items-center justify-content-center"
              >
                <h5 class="card-title text-secondary p-1">Flag</h5>
              </div>
    `);
      $(".country-coat-of-arms").html(`<img
      class="img-thumbnail"
      src="${response.coatOfArms.svg}"
      alt=""
    />
    <div
      class="card-body d-flex align-items-center justify-content-center"
    >
      <h5 class="card-title text-secondary">Coat of arms</h5>
    </div>
    `);
      $(".country-name").text(`${response.name.official}`);
      $(".country-capital").text(`${response.capital}`);
      $(".country-currency").text(
        `${Object.keys(response.currencies).join(", ")}`
      );
      $(".country-languages").text(
        `${Object.values(response.languages).join(", ")}`
      );

      response.borders.map((border) => {
        axios
          .get(`https://restcountries.com/v3.1/alpha/${border}`)
          .then(async (response) => {
            response = response.data[0];
            await makeBorders(response.name.official, response.flags.svg);
          });
      });
    })
    .then(() => {
      $(".loader__bg").removeClass("is-active");
      $(".table-country").removeClass("loading");
    })
    .catch(function () {
      alert(`Country "${countryName}" not found`);
      $(".loader__bg").removeClass("is-active");
    });
};

let makeBorders = function (countryName, flag) {
  $(".borders").append(`
  <div class="col-2">
  <div
    class="h-100 border-country card justify-content-evenly align-items-center"
  >
    <img
      class="img-fluid img-thumbnail"
      src="${flag}"
      alt=""
    />
    <div
      class="card-body d-flex align-items-center justify-content-center"
    >
      <h5 class="card-title text-secondary p-1 text-center">${countryName}</h5>
    </div>
  </div>
  </div>
  `);
};
