// Get references to page elements
var $resortName = $("#resort-name");
var $resortLink = $("#resort-link");
var $submitBtn = $("#submit");
var $resortList = $("#resort-list");

var API = {
  saveResort: function(resort) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/resorts",
      data: JSON.stringify(resort)
    });
  },
  getResorts: function() {
    return $.ajax({
      url: "api/resorts",
      type: "GET"
    });
  },
  deleteResort: function(id) {
    return $.ajax({
      url: "api/resorts/" + id,
      type: "DELETE"
    });
  }
};

var refreshResorts = function() {
  API.getResorts().then(function(data) {
    var $resorts = data.map(function(resort) {
      console.log(resort.name);
      var $a = $("<a>").text(resort.name).attr("href", "/resort/" + resort.id);
      var $li = $("<li>").attr({class: "list-group-item","data-id": resort.id}).append($a);
      var $button = $("<button>").addClass("btn btn-danger float-right delete").text("ｘ");
      $li.append($button);
      return $li;
    });
    $resortList.empty();
    $resortList.append($resorts);
  });
};

// handleFormSubmit is called whenever we submit a new resort
// Save the new resort to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var resort = {
    name: $resortName.val().trim(),
    link: $resortLink.val().trim()
  };

  if (!(resort.name && resort.link)) {
    alert("Enter a resort name and link");
    return;
  }

  API.saveResort(resort).then(function() {
    refreshResorts();
  });

  $resortName.val("");
  $resortLink.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this).parent().attr("data-id");
  API.deleteResort(idToDelete).then(function() {refreshResorts();});
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$resortList.on("click", ".delete", handleDeleteBtnClick);
