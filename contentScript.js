
var viewText = $("li[class ='count view']").find('span.value').map(function () {
    return $(this).text().replace(/,/g, "");;
}).get();
var mylistText = $("li[class ='count mylist']").find('span.value').map(function () {
    return $(this).text().replace(/,/g, "");
}).get();
var commentText = $("li[class ='count comment']").find('span.value').map(function () {
    return $(this).text().replace(/,/g, "");
}).get();

//converting string to int
var viewNum = viewText.map(function (i) { return parseInt(i, 10); });
var myListNum = mylistText.map(function (i) { return parseInt(i, 10); });
var commentNum = commentText.map(function (i) { return parseInt(i, 10); });

var listNum = 0;

var keys = ["percentageChoice", "colorChoice", "boldChecked"];
chrome.storage.sync.get(keys, function (value) {
    
    var chosenPercentage = value.percentageChoice;
    var chosenColor = value.colorChoice;
    var bold = "normal";

    if (value.boldChecked)
    {
        bold = "bold";
    }
    var percentage;
    $('.itemData').each(function () {

        
        if (chosenPercentage == "C/V") {
            percentage = Math.round((commentNum[listNum] / viewNum[listNum]) * 100);
        }

        else if (chosenPercentage == "M/C") {
            percentage = Math.round((myListNum[listNum] / commentNum[listNum]) * 100);
        }

        //puts M/V as default if storage.sync.get doesn't return anything
        else
        {
            percentage = Math.round((myListNum[listNum] / viewNum[listNum]) * 100);
            chosenPercentage = "M/V";
        }

        $(this).find('ul.list').append("<li class='view/mylist', style='font-family:Sans-Serif; font-size:85%;'><font color=#999>" + chosenPercentage + ' ' + "<span class='value', style='font-family:verdana; font-weight: "+ bold +";'><font color="+ chosenColor +">" + percentage + '%' + "</span></li>");
        listNum++;
    });
    listNum = 0;
    
});

