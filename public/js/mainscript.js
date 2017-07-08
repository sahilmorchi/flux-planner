//login
var provider = new firebase.auth.GoogleAuthProvider();
var signedIn = 0;
var name = '';
var username = '';
var uid = ''
var database = firebase.database();
var allScores = [];
$('.login').click(function(){
    if (signedIn == 0) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            username = user.displayName;
            name = user.displayName;
            uid = user.uid;
            $('.welcome').text(username);
            $('.login').text('LOGOUT');
            var photoUrl = user.photoURL;
            $('.pic').attr('src',photoUrl);
            //get the data from the database
            return firebase.database().ref('/users/'+uid+'/tests/').once('value').then(function(snapshot) {
                //append this data to the data on the page
                var data = snapshot.val();
                for (item in data) {
                    allScores.push(data[item]) 
                }
                sync();
            });
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
        signedIn = 1;        
    }
    else {
        firebase.auth().signOut().then(function() {
            $('.login').text('LOGIN');
            $('.welcome').text('Guest');
            $('.pic').attr('src','images/profileIcon.png');
            location.reload();
        }).catch(function(error) {
            console.log("unsuccesful");
        });
        signedIn = 0;
    }
});



//RESPONSIVENESS
$(window).resize(function(){
    mediaCheck({
        media: '(max-width: 900px)',
        entry: function() {
            $('.navBar').css('margin-left','-240');
            $('.navOpen').css('width','80');
            $('.mainContainer').css('margin-left','0');
            $('.mainContainer').css('width','100%');
        },
        exit: function() {
            $('.navBar').css('margin-left','');
            $('.navOpen').css('width','');
            $('.mainContainer').css('margin-left','');
            $('.mainContainer').css('width','');
        },
        both: function() {
        }
    });
});

//NAVIGATION
var isClosed = 0;
$('.fa-bars').click(function(){

        event.stopPropagation();
        $('.navBar').css('margin-left','');
        isClosed = 0;
        $('html').click(function() {
            isClosed = 1;
            $('.navBar').css('margin-left','-240');
            $('html').unbind('click');
        });

        $('.navBar').click(function(event){
            event.stopPropagation();
        });

});
$( document ).ready(function() {
    $('#dashboardMid').css('display','block');
    $('#dashboardMid').addClass('activePage');
});


$('#dashboard').click(function(){
    switchpage('#dashboardMid');
    $('.pageTitle').text('Dashboard');
});

$('#testScores').click(function(){
    switchpage('#testsMid');
    populateScores();
    $('.pageTitle').html('Test Scores');
    var aretherCards = $('.carousel').children().length
    setTimeout(function(){
        $('#circle').circleProgress({
        value: calcPercentageSAT(1500),
        size: 100,
        startAngle: (Math.PI)*3/2,
        fill: {
            gradient: ["red", "orange"]
        }
    },100)
});
});

$('#calendar').click(function(){
    switchpage('#calendarMid');
    $('.pageTitle').text('Calendar');
});

$('#analytics').click(function(){
    switchpage('#analyticssdMid');
    $('.pageTitle').text('Analytics');
});


//QUICK TILE JAVASCRIPT
var tests= []
var quickAdd = {};
$(document).on('click','#quickACT',function(){
    $('.close').css('display','block');
    $('.box').css('opacity','0'); 
    $('.quickAdd .title').css('height','1');
    $('.quickAdd .title').css('font-size','14');
    $('.quickAdd .title').css('margin-top','-10');
    setTimeout(function(){
        $('.box').empty();
        $('.box').html('<p class="range-field"> <input id="englishScore" type="range" id="test5" min="0" max="75" /><label for="test5">Enter your English Score</label> </p><button id="englishSubmit" class="blue moveUp btn waves-effect waves-light" type="submit" name="action">Submit <i class="material-icons right">send</i> </button>');
        $('.box').css('opacity','1'); 
        $('.close').css('opacity','1');
    },200);
});
$(document).on('click','#englishSubmit',function(){
   quickAdd['englishScore'] = $('#englishScore').val();
    $('.box').css('opacity','0'); 
    setTimeout(function(){
        $('.box').empty();
        $('.box').html('<p class="range-field"> <input id="mathScore" type="range" id="test5" min="0" max="60" /><label for="test5">Enter your Math Score</label> </p><button id="mathSubmit" class="blue moveUp btn waves-effect waves-light" type="submit" name="action">Submit <i class="material-icons right">send</i> </button>');
        $('.box').css('opacity','1'); 
    },200) 
});
$(document).on('click','#mathSubmit',function(){
   quickAdd['mathScore'] = $('#mathScore').val();
    $('.box').css('opacity','0'); 
    setTimeout(function(){
        $('.box').empty();
        $('.box').html('<p class="range-field"> <input id="readingScore" type="range" id="test5" min="0" max="40" /><label for="test5">Enter your Reading Score</label> </p><button id="readingSubmit" class="blue moveUp btn waves-effect waves-light" type="submit" name="action">Submit <i class="material-icons right">send</i> </button>');
        $('.box').css('opacity','1'); 
    },200) 
});
$(document).on('click','#readingSubmit',function(){
   quickAdd['readingScore'] = $('#readingScore').val();
    $('.box').css('opacity','0'); 
    setTimeout(function(){
        $('.box').empty();
        $('.box').html('<p class="range-field"> <input id="scienceScore" type="range" id="test5" min="0" max="40" /><label for="test5">Enter your Science Score</label> </p><button id="endSubmit" class="blue moveUp btn waves-effect waves-light" type="submit" name="action">Submit <i class="material-icons right">send</i> </button>');
        $('.box').css('opacity','1'); 
    },200) 
});

$(document).on('click','#endSubmit',function(){
   quickAdd['scienceScore'] = $('#scienceScore').val();
    quickAdd['type'] = 'ACT';
    
    //get the time submitted
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
    var dayOfmonth = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var date = month + "/" + dayOfmonth + '/' + year;
    var time = hour + ":" + minute;
    
    quickAdd['time'] = time;
    quickAdd['date'] = date;
    
    //animations
    $('.box').css('opacity','0'); 
    $('.close').css('opacity','0');
    $('.quickAdd .title').css('height','');
    $('.quickAdd .title').css('font-size','');
    $('.quickAdd .title').css('margin-top','');
    setTimeout(function(){
        $('.box').empty();
        $('.close').css('display','none');
        $('.box').html('<a id="quickACT" class="blue waves-effect waves-light btn-large">ACT</a> <a id="quickSAT" class="blue waves-effect waves-light btn-large">SAT</a>');
        $('.box').css('opacity','1'); 
        
        //here we convert the raw scores into act scores. Note, these are estimations as every test has a different act charts. 
        //this function updates the quickAdd variable with the total score and weighted scores for every section of the added ACT test.
        try {
            convertScores();
            //now we update our master array that contains all of our added assignments.  
            allScores.unshift(quickAdd);
            addTestDatabase(uid, username);
            //we clear the object so it can be used again
            quickAdd = new Object; 
        }
        catch(err) {
            Materialize.toast("Oops.. Something wen't wrong.", 3000);
            console.log(err);
        }
    },200);
});

$(document).on('click','#closeQuick',function(){
    $('.box').css('opacity','0'); 
    $('.close').css('opacity','0');
    $('.quickAdd .title').css('height','');
    $('.quickAdd .title').css('font-size','');
    $('.quickAdd .title').css('margin-top','');
    setTimeout(function(){
        $('.box').empty();
        $('.close').css('display','none');
        $('.box').html('<a id="quickACT" class="blue waves-effect waves-light btn-large">ACT</a> <a id="quickSAT" class="blue waves-effect waves-light btn-large">SAT</a>');
        $('.box').css('opacity','1'); 
        quickAdd = new Object; 
    },200); 
});
//FUNCTIONS



function calcPercentageSAT(score){
    return score/1600;
}


//this function switches the "page" when you click on the navigation icons
function switchpage(targetPage) {
    //important for carousel to reinitialize itself
    $('.carousel').removeClass('initialized');
    //this variable keeps track of which page you are on.
    var currentPage = $('.activePage');
    //animations
    currentPage.css('display','none');
    currentPage.removeClass('activePage');
    $(targetPage).css('display','block');
    $(targetPage).addClass('activePage');
}



//this function converts raw ACT scores into weighted ACT scores. 
//it uses a JSON variable called actScoreJSON, which is located at the bottom of the page.
function convertScores() {
    //this variable is what wil hold the converted scores for now. we can't directly implement them into our quickAdd variable becuase the function requires that this variable doesnt change until the for loop is finished.
    var convertedScore = {};
    //we iterate through every raw score in our list. 
    for (var item in quickAdd) {
        //we need to make sure we only try to match values that have a score key since the JSON only holds values for scores and we have other things, like dates in our quickAdd variable.
        if (item.includes('Score')) {
            //now we iterate through every item in the JSON list and see if our raw score and the JSONS score for the current raw score being looked at match. 
            actScoreJSON.forEach(function(score){
                var cellScore = score[item];
                var thisScore = quickAdd[item];
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
        quickAdd[item] = convertedScore[item];
    }
    var average = Math.round(total / 4);
    quickAdd['totalScore'] = average;
    
    //we clear the object so it can be used again
    convertedScore = new Object; 
}

//this function "populates" the recent scores tab in the test scores section. 
function populateScores() {
    //first it checks to see if any scores have been entered.  if not, it will display a message saying "add a score"
    if (allScores.length > 0) {
        //this html variable will hold all the html of the information carousel. 
        var html = '';
        //for every score added, we create a card. we switch out pieces of html with the values in the javascript score object. 
        for (var item in allScores) {
            var itemHTML = '<div class="minitileshaddow score carousel-item"> <div class="cardInfo"> <div class="title">Score Card<span class="date">'+allScores[item]["date"]+'</span></div> <div class="testType">'+allScores[item]["type"]+'<span class="time">'+allScores[item]["time"]+'</span></div> </div> <div class="scores"> <table class="scoreTable"> <tr> <td class="icon"> <i class="fa fa-star" aria-hidden="true"></i> </td> <td class="tableDesc"> Final Score: </td> <td class="tableScore">'+allScores[item]["totalScore"]+'</td> </tr> <tr class="details"> <td class="icon"> <i class="fa fa-pencil" aria-hidden="true"></i> </td> <td class="tableDesc"> English Score: </td> <td class="tableScore">'+allScores[item]["englishScore"]+'</td> </tr> <tr class="details"> <td class="icon"> <i class="fa fa-times" aria-hidden="true"></i> </td> <td class="tableDesc"> Math Score: </td> <td class="tableScore">'+allScores[item]["mathScore"]+'</td> </tr> <tr class="details"> <td class="icon"> <i class="fa fa-book" aria-hidden="true"></i> </td> <td class="tableDesc"> Reading Score: </td> <td class="tableScore"> '+allScores[item]["readingScore"]+'</td> </tr> <tr class="details"> <td class="icon"> <i class="fa fa-flask" aria-hidden="true"></i> </td> <td class="tableDesc"> Science Score: </td> <td class="tableScore">'+allScores[item]["scienceScore"]+'</td> </tr> </table> </div> </div>';
            html = html + itemHTML;
        }
        $('.carousel').html(html);
        setTimeout(function(){
            $('.carousel').carousel({dist: -50, indicators: true});  
        },10);   
    }
    else {
        $('.carousel').html('<div class="info">You have not entered any tests in yet.</div> <center class="down"><a class="blue waves-effect waves-light btn-large">Enter some here</a></center>');    
    }
}

function addTestDatabase(uid) {
    if (signedIn == 1) {
        Materialize.toast("We added your test succesfully!", 3000);
        return database.ref('/users/'+uid+'/tests/').set(allScores);   
    }
    else {
        Materialize.toast("We temporarilly saved your data, please login to save the data.", 4000);
    }
}
function sync() {
    Materialize.toast("Your data has succesfully synced!", 4000);
    return database.ref('/users/'+uid+'/tests/').set(allScores);   
}






//JSON TO CONVERT
var actScoreJSON = [
     {
       "trueScore": "36",
       "englishScore": "75",
       "mathScore": "60",
       "readingScore": "40",
       "scienceScore": "40",
       "Scaled Score": "36"
     },
     {
       "trueScore": "35",
       "englishScore": "74",
       "mathScore": "57-58",
       "readingScore": "39",
       "scienceScore": "39",
       "Scaled Score": "35"
     },
     {
       "trueScore": "34",
       "englishScore": "71-72",
       "mathScore": "55-56",
       "readingScore": "38",
       "scienceScore": "38",
       "Scaled Score": "34"
     },
     {
       "trueScore": "33",
       "englishScore": "70",
       "mathScore": "54",
       "readingScore": "–",
       "scienceScore": "37",
       "Scaled Score": "33"
     },
     {
       "trueScore": "32",
       "englishScore": "69",
       "mathScore": "53",
       "readingScore": "37",
       "scienceScore": "–",
       "Scaled Score": "32"
     },
     {
       "trueScore": "31",
       "englishScore": "68",
       "mathScore": "52",
       "readingScore": "36",
       "scienceScore": "36",
       "Scaled Score": "31"
     },
     {
       "trueScore": "30",
       "englishScore": "67",
       "mathScore": "50-51",
       "readingScore": "35",
       "scienceScore": "35",
       "Scaled Score": "30"
     },
     {
       "trueScore": "29",
       "englishScore": "66",
       "mathScore": "49",
       "readingScore": "34",
       "scienceScore": "34",
       "Scaled Score": "29"
     },
     {
       "trueScore": "28",
       "englishScore": "64-65",
       "mathScore": "47-48",
       "readingScore": "33",
       "scienceScore": "33",
       "Scaled Score": "28"
     },
     {
       "trueScore": "27",
       "englishScore": "62-63",
       "mathScore": "45-46",
       "readingScore": "32",
       "scienceScore": "31-32",
       "Scaled Score": "27"
     },
     {
       "trueScore": "26",
       "englishScore": "60-61",
       "mathScore": "43-44",
       "readingScore": "31",
       "scienceScore": "30",
       "Scaled Score": "26"
     },
     {
       "trueScore": "25",
       "englishScore": "58-59",
       "mathScore": "41-42",
       "readingScore": "30",
       "scienceScore": "28-29",
       "Scaled Score": "25"
     },
     {
       "trueScore": "24",
       "englishScore": "56-57",
       "mathScore": "38-40",
       "readingScore": "29",
       "scienceScore": "26-27",
       "Scaled Score": "24"
     },
     {
       "trueScore": "23",
       "englishScore": "53-55",
       "mathScore": "36-37",
       "readingScore": "27-28",
       "scienceScore": "24-25",
       "Scaled Score": "23"
     },
     {
       "trueScore": "22",
       "englishScore": "51-52",
       "mathScore": "34-35",
       "readingScore": "26",
       "scienceScore": "23",
       "Scaled Score": "22"
     },
     {
       "trueScore": "21",
       "englishScore": "48-50",
       "mathScore": "33",
       "readingScore": "25",
       "scienceScore": "21-22",
       "Scaled Score": "21"
     },
     {
       "trueScore": "20",
       "englishScore": "45-47",
       "mathScore": "31-32",
       "readingScore": "23-24",
       "scienceScore": "19-20",
       "Scaled Score": "20"
     },
     {
       "trueScore": "19",
       "englishScore": "42-44",
       "mathScore": "29-30",
       "readingScore": "22",
       "scienceScore": "17-18",
       "Scaled Score": "19"
     },
     {
       "trueScore": "18",
       "englishScore": "40-41",
       "mathScore": "27-28",
       "readingScore": "20-21",
       "scienceScore": "16",
       "Scaled Score": "18"
     },
     {
       "trueScore": "17",
       "englishScore": "38-39",
       "mathScore": "24-26",
       "readingScore": "19",
       "scienceScore": "14-15",
       "Scaled Score": "17"
     },
     {
       "trueScore": "16",
       "englishScore": "35-37",
       "mathScore": "19-23",
       "readingScore": "18",
       "scienceScore": "13",
       "Scaled Score": "16"
     },
     {
       "trueScore": "15",
       "englishScore": "33-34",
       "mathScore": "15-18",
       "readingScore": "16-17",
       "scienceScore": "12",
       "Scaled Score": "15"
     },
     {
       "trueScore": "14",
       "englishScore": "30-32",
       "mathScore": "12-14",
       "readingScore": "14-15",
       "scienceScore": "11",
       "Scaled Score": "14"
     },
     {
       "trueScore": "13",
       "englishScore": "29",
       "mathScore": "10-11",
       "readingScore": "13",
       "scienceScore": "10",
       "Scaled Score": "13"
     },
     {
       "trueScore": "12",
       "englishScore": "27-28",
       "mathScore": "8-9",
       "readingScore": "11-12",
       "scienceScore": "9",
       "Scaled Score": "12"
     },
     {
       "trueScore": "11",
       "englishScore": "25-26",
       "mathScore": "6-7",
       "readingScore": "9-10",
       "scienceScore": "8",
       "Scaled Score": "11"
     },
     {
       "trueScore": "10",
       "englishScore": "23-24",
       "mathScore": "5",
       "readingScore": "8",
       "scienceScore": "7",
       "Scaled Score": "10"
     },
     {
       "trueScore": "9",
       "englishScore": "20-22",
       "mathScore": "4",
       "readingScore": "7",
       "scienceScore": "6",
       "Scaled Score": "9"
     },
     {
       "trueScore": "8",
       "englishScore": "17-19",
       "mathScore": "–",
       "readingScore": "6",
       "scienceScore": "5",
       "Scaled Score": "8"
     },
     {
       "trueScore": "7",
       "englishScore": "14-16",
       "mathScore": "3",
       "readingScore": "5",
       "scienceScore": "4",
       "Scaled Score": "7"
     },
     {
       "trueScore": "6",
       "englishScore": "11-13",
       "mathScore": "–",
       "readingScore": "4",
       "scienceScore": "3",
       "Scaled Score": "6"
     },
     {
       "trueScore": "5",
       "englishScore": "9-10",
       "mathScore": "2",
       "readingScore": "3",
       "scienceScore": "–",
       "Scaled Score": "5"
     },
     {
       "trueScore": "4",
       "englishScore": "6-8",
       "mathScore": "–",
       "readingScore": "–",
       "scienceScore": "2",
       "Scaled Score": "4"
     },
     {
       "trueScore": "3",
       "englishScore": "5",
       "mathScore": "1",
       "readingScore": "2",
       "scienceScore": "1",
       "Scaled Score": "3"
     },
     {
       "trueScore": "2",
       "englishScore": "3-4",
       "mathScore": "–",
       "readingScore": "1",
       "scienceScore": "–",
       "Scaled Score": "2"
     },
     {
       "trueScore": "1",
       "englishScore": "0-2",
       "mathScore": "0",
       "readingScore": "0",
       "scienceScore": "0",
       "Scaled Score": "1"
     }
    ]