
var currentDateBlockID = '';
$(document).ready(function(){
    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }
    var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var today = new Date;
    
    
    //different functions take the month in different formats
    var month = today.getMonth() - 1;
    var wierdMonth = month + 1;
    

    var year = today.getFullYear();
    
    //fill in the header
    var todayDay = days[today.getDay()];
    var todayDate = today.getDate();
    var todaysMonthWord = months[month + 1];
    var fullDate = todayDay + ', ' + todaysMonthWord + ' ' + todayDate;
    $('.calendarDate').text(fullDate);
    $('#calendarDay').text(months[month + 1]);
    
    //fill in the calendar
    //determine number of days in current month
    var daysInMonth = daysInMonth(wierdMonth, year) * 1 + 1;
    //make an array with range 0 to days in month
    var daysArray = Array.apply(null, Array(daysInMonth)).map(function (_, i) {return i;});
    var calendarItems = ''
    //for every item in array generate a tile
    for (var item in daysArray) {
        var day = item * 1 + 1;
        var x = months[wierdMonth] + ' ' + day + ',' + ' ' + year;
        var dayName = days[new Date(x).getDay()];
        var html = '<div id=calendar'+item+' class="waves-effect z-depth-1 dateBlock"> <div class="dayNum"><span class="circleme"><div class="fixme">'+day+'</div></span><span class="dayName">'+dayName+'</span></div> <div class="eventDesc">No Assignments Yet</div> </div>';
        calendarItems = calendarItems + html;
    }
    $('.dateContainer').html(calendarItems);
    currentDateBlockID = 'calendar'+(todayDate - 1);
    $('#calendar'+(todayDate - 1)).children().children().first().removeClass('circleme');
    $('#calendar'+(todayDate - 1)).children().children().first().addClass('currentDate');
});

//handle clicking on a date.

$('body').on('click','.dateBlock',function(event){
    event.stopPropagation();
    //get the id of the selected block
    var blockID = $(this).prop("id");
    //unselect previously selected
    $('#'+currentDateBlockID).children().children().first().removeClass('currentDate');
    $('#'+currentDateBlockID).children().children().first().addClass('circleme');
    //select the selected block
    $(this).children().children().first().removeClass('circleme');
    $(this).children().children().first().addClass('currentDate');
    //set this block as the selected block
    currentDateBlockID = blockID;
    
    
    //update the header
    var dayName = $(this).children().children().last().text();
    var dayNum = $(this).children().children().first().text();
    var monthNaMe = $('#calendarDay').text();
    var newName = dayName + ', ' + monthNaMe + ' ' + dayNum;
    $('.calendarDate').text(newName);
    
    //display details
    $('.dayTitle').css('margin-top','50');
    $('.calendarForm').css('opacity','1');
});
$('body').click(function(){
    $('.dayTitle').css('margin-top','');
    $('.calendarForm').css('opacity','');
    $('.calendarDesc').css('opacity','0');
    setTimeout(function(){
        $('.calendarDesc').html('<div class="z-depth-2 assignName center-align">Take an ACT test</div>');
    },200);
    setTimeout(function(){
        $('.calendarDesc').css('opacity','');
    },300);
    
});
$("#calendarsbmt").click(function(event){
    event.stopPropagation();
    $('.calendarDesc').css('opacity','0');
    setTimeout(function(){
        $('.calendarDesc').html('<div class="z-depth-2 assignDrag center-align"><p class="fixrange range-field"> <input id="scienceScore" type="range" id="test5" min="0" max="40" /> </p></div>');
    },200);
    setTimeout(function(){
        $('.calendarDesc').css('opacity','');
    },300);
}); 













