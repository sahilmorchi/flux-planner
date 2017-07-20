//CALENDAR.JS HANDLES ALL OPERATIONS ON THE CALENDAR PAGE.
//Its divided into 3 sections.  Initilization, activity completion, and updates. 

/////////////////////////////////////////////////////////////////////////////
//INITILIZATION
/////////////////////////////////////////////////////////////////////////////

//the variable below allows us to target the selected date
var currentDateBlockID = '';
//they type variable is integrated into the date block and represents what type of activity is due that day. 
//this isnt done yet so we just hardcode it. 
var type="actFull";
var typeDesc="ACT Full";
var goal = 28;
$(document).ready(function(){
    //we create two lists to turn the date object numbers into words. 
    var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //we create a date object
    var today = new Date();
    //here we extract the month , year, day in number form and day in word form.
    var month = today.getMonth();
    var year = today.getFullYear();
    var todayDay = days[today.getDay()];
    var todayDate = today.getDate();
    var todaysMonthWord = months[month];
    //the subtitle of the calendar displays the date nicley. Here we compile the nicley written date.
    var fullDate = todayDay + ', ' + todaysMonthWord + ' ' + todayDate + ', ' + year;
    //here we set the header to display the dates. 
    $('.calendarDate').text(fullDate);
    $('#calendarDay').text(months[month]);
    //this is a function that returns how many days a month has
    function daysInMonth(month,year) {
        return new Date(year, month + 1, 0).getDate();
    }
    //we call the function here
    var daysInMonth = daysInMonth(month, year) * 1;
    //we create an array with integers going up by one until the maximum number of days in the month. 
    var daysArray = Array.apply(null, Array(daysInMonth)).map(function (_, i) {return i;});
    //this variable holds all the HTML that wil be created in the next for loop
    var calendarItems = '';
    //we iterate through the list we just made, we are basically doing something for every day in the month.
    for (var item in daysArray) {
        //we get the day in number form for that day
        var day = item * 1 + 1;
        //this variable is used to plug into a date object and find the day of the week that day is in.
        var x = months[month] + ' ' + day + ',' + ' ' + year;
        var dayName = days[new Date(x).getDay()];
        //the html below represents one dateblock that you see in the calendar. 
        var html = '<div goal='+goal+' name='+type+' id=calendar'+item+' class="waves-effect z-depth-1 dateBlock"> <div class="dayNum"><span class="circleme"><div class="fixme">'+day+'</div></span><span class="dayName">'+dayName+'</span></div> <div class="eventDesc"><div class="chip">'+typeDesc+'</div></div> </div>';
        //we add the html to our html variable so more can be added to it.
        calendarItems = calendarItems + html;
    }
    //once the for loop is done we set the html of the calendar to the dynamically generated tiles.
    $('.dateContainer').html(calendarItems);
    //we set the currentblockID to today's date.
    currentDateBlockID = 'calendar'+(todayDate - 1);
    $('#calendar'+(todayDate - 1)).children().children().first().removeClass('circleme');
    $('#calendar'+(todayDate - 1)).children().children().first().addClass('currentDate');
});



/////////////////////////////////////////////////////////////////////////////
//ACTIVITY COMPLETION
/////////////////////////////////////////////////////////////////////////////
var unclickable = 0;
//the blocktype type holds the variable of the block clicked so that we can reference it later.
var blockType = '';
//the stage variable controls what is displayed when you complete an assignment in the calendar. 
var stage = 'x';
var blockGoal = '';
$('body').on('click','.dateBlock',function(event){
    unclickable = 0;
    blockType = $(this).attr('name');
    //display different messages in the activity box based on what type of block you clicked.
    if (blockType == 'actFull') {
        stage = 0;
        var text = 'Take an ACT test'; 
    }
    else if (blockType == 'actEnglish') {
        var text = 'Do the ACT English part'; 
    }
    else if (blockType == 'actMath') {
        var text = 'Do the ACT Math part'; 
    }
    else if (blockType == 'actScience') {
        var text = 'Do the ACT Science part'; 
    }
    else if (blockType == 'actReading') {
        var text = 'Do the ACT Reading part'; 
    }
    else {
        var text = 'Take a SAT test'; 
    }
    $('.calendarDesc').html('<div class="z-depth-2 assignName center-align">'+text+'</div>');
    event.stopPropagation();
    $('#calendarsbmt').css('cursor','');
    //get the id of the selected block
    var blockID = $(this).prop("id");
    blockGoal = $(this).attr("goal");
    console.log(blockGoal);
    //unselect previously selected
    $('#'+currentDateBlockID).children().children().first().removeClass('currentDate');
    $('#'+currentDateBlockID).children().children().first().addClass('circleme');
    //select the selected block
    $(this).children().children().first().removeClass('circleme');
    $(this).children().children().first().addClass('currentDate');
    //set this block as the selected block
    currentDateBlockID = blockID;
    var today = new Date();
    today.setMonth(today.getMonth() + monthsChanged);
    var year = today.getFullYear();
    //update the header
    var dayName = $(this).children().first().children().last().text();
    var dayNum = $(this).children().children().first().text();
    var monthNaMe = $('#calendarDay').text();
    var newName = dayName + ', ' + monthNaMe + ' ' + dayNum + ', ' + year;
    $('.calendarDate').text(newName);
    
    //display details
    $('.dayTitle').css('margin-top','50');
    $('.calendarForm').css('opacity','1');
});
//the stage variable saves the stage in which you are at in entering your scores

$('body').click(function(){
    unclickable = 1;
    //make it so that the user cant click on the submit button while its invisible
    $('#calendarsbmt').css('cursor','default');
    $('.dayTitle').css('margin-top','');
    $('.calendarForm').css('opacity','');
    $('.calendarDesc').css('opacity','0');
    setTimeout(function(){
        $('.calendarDesc').html('<div class="z-depth-2 assignName center-align">Take an ACT test</div>');
        $('#calendarsbmt').html('DONE<i class="material-icons right">send</i>');
    },200);
    setTimeout(function(){
        $('.calendarDesc').css('opacity','');
        $('#calendarsbmt').css('opacity','');
        stage = 0;
    },300); 
    
});

var calendarAdd = {};
$("#calendarsbmt").click(function(event){
    if (unclickable == 0) {
        event.stopPropagation();
        if (stage == 0) {
            finishAssignment('English',0,75);
        }
        else if (stage == 1) {
            calendarAdd['englishScore'] = $('#calendaradd').val();
            finishAssignment('Math',0,60);
        }
        else if (stage == 2) {
            calendarAdd['mathScore'] = $('#calendaradd').val();
            finishAssignment('Reading',0,40);
        }
        else if (stage == 3) {
            calendarAdd['readingScore'] = $('#calendaradd').val();
            finishAssignment('Science',0,40);
        }
        else if (stage == 4) {
            calendarAdd['scienceScore'] = $('#calendaradd').val();
            enterAll();
        }
    }
    else {}
}); 

//this function handles the submission of an assignment. 
function finishAssignment(type, min, max) {
    $('.calendarDesc').css('opacity','0');
    if (blockType == 'actFull') {
        setTimeout(function(){
            $('.calendarDesc').html('<div class="z-depth-2 assignDrag center-align"><p class="fixrange range-field"> <input type="range" id="calendaradd" min="'+min+'" max="'+max+'" /> </p></div>');
            $('#calendarsbmt').html('Submit '+type+' score.<i class="material-icons right">send</i>')
        },200);
        setTimeout(function(){
            $('.calendarDesc').css('opacity','');
        },300);
        stage = stage + 1;
    }
    else if (blockType == 'actEnglish') {
        
    }
    else if (blockType == 'actMath') {
        
    }
    else if (blockType == 'actScience') {
        
    }
    else if (blockType == 'actReading') {
        
    }
    else {
        console.log("no support for SAT yet");
    }
}
function enterAll() {
    //make everything fade away
    $('#calendarsbmt').css('cursor','default');
    $('.dayTitle').css('margin-top','');
    $('.calendarForm').css('opacity','');
    $('.calendarDesc').css('opacity','0');
    $('#calendarsbmt').css('opacity','0');
    setTimeout(function(){
        $('.calendarDesc').html('<div class="z-depth-2 assignName center-align">Take an ACT test</div>');
        $('#calendarsbmt').html('DONE<i class="material-icons right">send</i>');
    },200);
    setTimeout(function(){
        $('.calendarDesc').css('opacity','');
        $('#calendarsbmt').css('opacity','');
        stage = 0;
    },300); 
    
    //get the time
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();
    if (hour > 12) {
        hour = hour - 12;
        minute = minute + ' PM'
    }
    else {
        minute = minute + ' AM'
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    else {}
    var dayOfmonth = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var date = month + "/" + dayOfmonth + '/' + year;
    var time = hour + ":" + minute;
    
    //add these things our calendar add variable
    calendarAdd['time'] = time;
    calendarAdd['date'] = date;
    calendarAdd['type'] = 'ACT';
    
    //now we convert scores and add them to the database. 
    try {
        convertScoresCalendar();
        console.log(calendarAdd);
        console.log(blockGoal)
        console.log(calendarAdd['totalScore'])
        if (calendarAdd['totalScore'] >= blockGoal) {
            console.log("its fine");
            $('#'+currentDateBlockID).find('.chip').css('background-color','#0D47A1');
            $('#'+currentDateBlockID).find('.chip').css('color','white');
            $('#'+currentDateBlockID).find('.chip').text('Finished');
        }
        else {
            console.log("failed");
        }
        //now we update our master array that contains all of our added assignments.  
        allScores.unshift(calendarAdd);
        addTestDatabase(uid, username);
        //we clear the object so it can be used again
        calendarAdd = new Object; 
    }
    catch(err) {
        Materialize.toast("Oops.. Something wen't wrong.", 3000);
        console.log(err);
    }
}
function convertScoresCalendar() {
    //this variable is what wil hold the converted scores for now. we can't directly implement them into our quickAdd variable becuase the function requires that this variable doesnt change until the for loop is finished.
    var convertedScore = {};
    //we iterate through every raw score in our list. 
    for (var item in calendarAdd) {
        //we need to make sure we only try to match values that have a score key since the JSON only holds values for scores and we have other things, like dates in our quickAdd variable.
        if (item.includes('Score')) {
            //now we iterate through every item in the JSON list and see if our raw score and the JSONS score for the current raw score being looked at match. 
            actScoreJSON.forEach(function(score){
                var cellScore = score[item];
                var thisScore = calendarAdd[item];
                //the JSON includes ranges of raw scores for some of its weighted scores
                //we detect this here by seeing if the value includes a dash, and then pulling the two values out to use an inequlity if then statement rather than an = if then statment. 
                if (cellScore.includes('-')) {
                    var trueScore = score['trueScore'];
                    var dashIndex = cellScore.indexOf('-');
                    var score1 = cellScore.slice(0,dashIndex) * 1;
                    var score2 = cellScore.slice(dashIndex + 1, cellScore.length) * 1;
                    if ((thisScore >= score1) && (thisScore <= score2)) {
                        //if they do match, put the value in our converted score list.
                        var trueScore = score['trueScore'];
                        convertedScore[item] = trueScore;
                    }
                }
                else {
                    if (thisScore == cellScore) {
                        var trueScore = score['trueScore'];
                        convertedScore[item] = trueScore;
                    }   
                }
            });
        }
    }
    //now that our forloop is over, we can add the values from our convertedScore object into our quick add object. 
    //while we do that, we also calculate the average of our 4 weighted scores to get their overall score on the ACT. 
    var total = 0;
    for (var item in convertedScore) {
        total = total + convertedScore[item] * 1;
        calendarAdd[item] = convertedScore[item];
    }
    var average = Math.round(total / 4);
    calendarAdd['totalScore'] = average;
    
    //we clear the object so it can be used again
    convertedScore = new Object; 
}

/////////////////////////////////////////////////////////////////////////////
//UPDATE
/////////////////////////////////////////////////////////////////////////////

//if you want to see how the month increases, just look at the first section, the functions are very similar. 
$('#increaseMonth').click(function(){
    changeMonth(1);
});
$('#decreaseMonth').click(function(){
    changeMonth(-1);
});

var monthsChanged = 0;
function changeMonth(number) {
    monthsChanged = monthsChanged + number;
    console.log(monthsChanged);
    var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var today = new Date();
    today.setMonth(today.getMonth() + monthsChanged);
    var month = today.getMonth();
    var year = today.getFullYear();
    var todayDay = days[today.getDay()];
    var todayDate = today.getDate();
    var todaysMonthWord = months[month];
    var fullDate = todayDay + ', ' + todaysMonthWord + ' ' + todayDate + ', ' + year;
    $('.calendarDate').text(fullDate);
    $('#calendarDay').text(months[month]);
    function daysInMonth(month,year) {
        return new Date(year, month + 1, 0).getDate();
    }
    var daysInMonth = daysInMonth(month, year) * 1;
    var daysArray = Array.apply(null, Array(daysInMonth)).map(function (_, i) {return i;});
    var calendarItems = '';
    for (var item in daysArray) {
        var day = item * 1 + 1;
        var x = months[month] + ' ' + day + ',' + ' ' + year;
        var dayName = days[new Date(x).getDay()];
        var html = '<div name='+type+' id=calendar'+item+' class="waves-effect z-depth-1 dateBlock"> <div class="dayNum"><span class="circleme"><div class="fixme">'+day+'</div></span><span class="dayName">'+dayName+'</span></div> <div class="eventDesc"><div class="chip">'+typeDesc+'</div></div> </div>';
        calendarItems = calendarItems + html;
    }
    $('.dateContainer').html(calendarItems);
    currentDateBlockID = 'calendar'+(todayDate - 1);
    $('#calendar'+(todayDate - 1)).children().children().first().removeClass('circleme');
    $('#calendar'+(todayDate - 1)).children().children().first().addClass('currentDate');
}










