/*jslint browser: true*/
/*global $, jQuery, alert*/

var home_selected = false;
var project1_selected = true;
var project2_selected = false;

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
        if (project1_selected !== true) {
            $('#Project1').css("background-color", "whitesmoke");
        }
        
        if (project1_selected === true) {
            $('#Project1').css("background-color", "darkgray");
        }
    });
    
    /* DRAGGABLE CUBES MAN */
    $('#Project2').mouseenter(function () {
        $('#Project2').css("background-color", "lightgray");
    });
    
    $('#Project2').mouseleave(function () {
        if (project2_selected !== true) {
            $('#Project2').css("background-color", "whitesmoke");
        }
        
        if (project2_selected === true) {
            $('#Project2').css("background-color", "darkgray");
        }
    });
    
    $('#Home').click(function () {
        $('#Project1Container').hide();
        $('#Project2Container').hide();
        $('#HomeContainer').show();
        $('#Home').css("background-color", "darkgray");
        $('#Project1').css("background-color", "whitesmoke");
        $('#Project2').css("background-color", "whitesmoke");
        home_selected = true;
        project1_selected = false;
        project2_selected = false;
    });
    
    $('#Project1').click(function () {
        $('#HomeContainer').hide();
        $('#Project2Container').hide();
        $('#Project1Container').show();
        $('#Home').css("background-color", "whitesmoke");
        $('#Project1').css("background-color", "darkgray");
        $('#Project2').css("background-color", "whitesmoke");
        project1_selected = true;
        project2_selected = false;
        home_selected = false;
    });
    
    $('#Project2').click(function () {
        $('#HomeContainer').hide();
        $('#Project1Container').hide();
        $('#Project2Container').show();
        $('#Home').css("background-color", "whitesmoke");
        $('#Project1').css("background-color", "whitesmoke");
        $('#Project2').css("background-color", "darkgray");
        project2_selected = true;
        project1_selected = false;
        home_selected = false;
    });
    
}



$(document).ready(function () {
    "use strict";
    $('#HomeContainer').hide();
    $('#Project2Container').hide();
    $('#Project1').css("background-color", "darkgray");
    main();
});