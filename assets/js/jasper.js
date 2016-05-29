/*jslint browser: true*/
/*global $, jQuery, alert*/

var home_selected = false;
var project_selected = true;

function main() {
    "use strict";
    
    $('#Home').mouseenter(function () {
        $('#Home').css("background-color", "lightgray");
    });
    $('#Home').mouseleave(function () {
        if (home_selected !== true) {
            $('#Home').css("background-color", "whitesmoke");
        }
        if (home_selected === true) {
            $('#Home').css("background-color", "darkgray");
        }
    });
    
    $('#Project1').mouseenter(function () {
        $('#Project1').css("background-color", "lightgray");
    });
    
    $('#Project1').mouseleave(function () {
        if (project_selected !== true) {
            $('#Project1').css("background-color", "whitesmoke");
        }
        
        if (project_selected === true) {
            $('#Project1').css("background-color", "darkgray");
        }
    });
    
    $('#Home').click(function () {
        $('#Project1Container').hide();
        $('#HomeContainer').show();
        $('#Home').css("background-color", "darkgray");
        $('#Project1').css("background-color", "whitesmoke");
        home_selected = true;
        project_selected = false;
    });
    
    $('#Project1').click(function () {
        $('#HomeContainer').hide();
        $('#Project1Container').show();
        $('#Home').css("background-color", "whitesmoke");
        $('#Project1').css("background-color", "darkgray");
        project_selected = true;
        home_selected = false;
    });
    
}



$(document).ready(function () {
    "use strict";
    $('#HomeContainer').hide();
    $('#Project1').css("background-color", "darkgray");
    main();
});