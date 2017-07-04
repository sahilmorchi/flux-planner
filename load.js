$( document ).ready(function() {
     mediaCheck({
        media: '(max-width: 800px)',
        entry: function() {
            $('.navBar').css('margin-left','-240');
            $('.navOpen').css('width','80');
            $('.middleLayout').css('width','100%');
        },
        exit: function() {
            $('.navBar').css('margin-left','');
            $('.navOpen').css('width','');
            $('.middleLayout').css('width','');
        },
        both: function() {
        }
    });
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    month = months[month];
    var dayText = today.getDay();
    dayText = days[dayText];
    $('.daytext').text(dayText);
    var totalDate = month + ' ' + day + 'th, ' + year;
    $('.dashDate').text(totalDate);
});