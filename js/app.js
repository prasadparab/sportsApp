(function () {
    "use strict";
    var username = "prasadparab";
    var password = "media.net";
    var dataLocation = 0;
    var dataSource;
    var noOfRecordsToDisplay = 12;
    var active_player = "https://api.mysportsfeeds.com/v1.2/pull/nhl/2016-2017-regular/active_players.json";

    function getData(url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                async: true,
                headers: {
                    "Authorization": "Basic " + btoa(username +
                        ":" +
                        password
                    )
                },
                success: function (data) {
                    resolve(data);
                },
                error: function () {
                    reject();
                }
            });
        });
    }
    
    getData(active_player).then(function (success) {
        dataSource = success.activeplayers.playerentry;
        displayEntries();
    });

    function displayEntries() {
        $("#movieData").html("");
        for (var i = 0; i < noOfRecordsToDisplay; i++) {
            appendPlayer(dataSource[dataLocation], dataLocation);
            dataLocation++;
        }
    }

    function appendPlayer(data, index) {
        var template = `<div class='movie' data-id=${index?index:null}>` +
            "<div class='content'>" +
            "<div class='rating'>" +
            "<span><i class='fas fa-star'></i></span>" +
            "<span><i class='fas fa-star'></i></span>" +
            "<span><i class='fas fa-star'></i></span>" +
            "<span><i class='fas fa-star'></i></span>" +
            "<span><i class='fas fa-star'></i></span>" +
            "</div>" +
            `<div class='movieBanner'><img src=${data.player.officialImageSrc}></div>` +
            `<div class='movieName'>${data.player.FirstName +' '+ data.player.LastName}</div>` +
            `<div class='movieYear'>ID #${data.player.ID}</div>` +
            `<div class='movieInfo'>Age: ${data.player.Age}, Jersey Number:${data.player.JerseyNumber} <br>Team: ${data.team?data.team.ID+","+data.team.Name+","+data.team.City:'N/A'}</div>` +
            "</div>" +
            '<span class="removePlayer"><i class="fas fa-trash-alt"></i></span>' +
            "</div>"
        $("#movieData").append(template);
    }

    //handling previous nad back click functionality
    $(".navigation .next").on("click", function () {
        if (dataLocation < dataSource.length - noOfRecordsToDisplay)
            displayEntries();
    });
    $(".navigation .prev").on("click", function () {
        if (dataLocation - (noOfRecordsToDisplay * 2) >= 0) {
            dataLocation = dataLocation - (noOfRecordsToDisplay * 2);
            displayEntries();
        }
    });

    function refreshList() {
        if (dataLocation - noOfRecordsToDisplay >= 0) {
            dataLocation = dataLocation - noOfRecordsToDisplay;
            displayEntries();
        }
    }

    //to remove record
    $(document).on("click", ".removePlayer", function () {
        if ($(this).parent().attr("data-id")!=='null') {
            dataSource.splice($(this).parent().attr("data-id"), 1);
            refreshList();
        }
    });

    //to search on currently viewing records
    $("#movieSearchTxtBox").on("keyup", function () {
        var search = [];
        if ($(this).val().length) {
            for (var i = dataLocation - noOfRecordsToDisplay; i < dataLocation; i++) {
                if (dataSource[i].player.FirstName.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) {
                    search.push(dataSource[i]);
                }
            }
            $("#movieData").html("");
            for (var i = 0; i < search.length; i++) {
                appendPlayer(search[i]);
            }
        } else {
            refreshList();
        }
    });
})();