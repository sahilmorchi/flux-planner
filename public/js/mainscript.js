
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
    $('.pageTitle').html('Test Scores');
    $('.carousel').carousel({dist: -50, indicators: true});
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
        Materialize.toast("We added your ACT test successfully", 3000);
        /*
        Materialize.toast('Added an ACT Test with these scores:', 4000);
        setTimeout(function(){Materialize.toast('Reading Score: ' + quickAdd['readingScore'], 4000);},1000);
        setTimeout(function(){Materialize.toast('Math Score: ' + quickAdd['mathScore'], 4000);},1200);
        setTimeout(function(){Materialize.toast('English Score: ' + quickAdd['englishScore'], 4000);},1400);
        setTimeout(function(){Materialize.toast('Science Score: ' + quickAdd['scienceScore'], 4000);},1600);
        */
        console.log(quickAdd);
        hasQuicked = 0;
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
    },200); 
});
//FUNCTIONS
function calcPercentageSAT(score){
    return score/1600;
}
function switchpage(targetPage) {
    var currentPage = $('.activePage');
    currentPage.css('display','none');
    currentPage.removeClass('activePage');
    $(targetPage).css('display','block');
    $(targetPage).addClass('activePage');
}