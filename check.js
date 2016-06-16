
var clickcount = 0
var filledcircles = [];
var filledlines = [];
var possiblesolutions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
$(document).ready(function(){

$('#maincanvas').click(function(e) {
    var offset = $(this).offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;
    var blocknumber = getblocknumberforcoordinates(x,y);
    if (filledcircles.indexOf(blocknumber) == -1 && filledlines.indexOf(blocknumber) == -1) {
        if (clickcount % 2 == 0) {
            var circlecoordinates = getcirclecoordinates(blocknumber);
            drawcircleusingcoordinates(circlecoordinates);
            filledcircles.push(blocknumber);
        } else {
            var linecoordinates = getlinecoordinates(blocknumber);
            drawlinesusingcoordinates(linecoordinates);
            filledlines.push(blocknumber);
        }
        if(isendofgame()) {
            reloadpage();
        }
        clickcount += 1;  
    }
    

  });

    

});


function getblocknumberforcoordinates(x,y) {
    if(x < 134) {
        if(y < 117) {
            return 1;
        }
        if(y<234) {
            return 2;
        }
        if (y<350) {
            return 3;
        }
    }
    if(x < 267) {
        if(y < 117) {
            return 4;
        }
        if(y<234) {
            return 5;
        }
        if (y<350) {
            return 6;
        }        
    }
    if(x<400) {
        if(y < 117) {
            return 7;
        }
        if(y<234) {
            return 8;
        }
        if (y<350) {
            return 9;
        } 
    }
}
function getlengthandbreadth(blocknumber) {
    if(blocknumber == 1) {
        return [134,117];
    }
    if(blocknumber == 2) {
        return [134,234];
    }
    if(blocknumber == 3) {
        return[134,350];
    }
    if(blocknumber == 4) {
        return [267,117];
    }
    if(blocknumber == 5) {
        return [267,234];
    }
    if(blocknumber == 6) {
        return [267,350];
    }
    if(blocknumber == 7) {
        return [400,117];
    }
    if( blocknumber == 8) {
        return [400,234];
    }
    if(blocknumber == 9) {
        return [400,350];
    }
    return [];
}

function getlinecoordinates(blocknumber) {
    array = getlengthandbreadth(blocknumber);
    length = array[0];
    breadth = array[1];
    var size = 8;
    var minlength = 134;
    var minbreadth = 117;
    return [length-minlength+size,breadth-minbreadth+size,length-size,breadth-size,length-size,breadth-minbreadth+size,length-minlength+size,breadth-size];
}

function getcirclecoordinates(blocknumber) {
    array = getlengthandbreadth(blocknumber);
    length = array[0];
    breadth = array[1];
    var minlength = 134;
    var minbreadth = 117;
    return [
        (length+(length-minlength))/2,
        (breadth+(breadth-minbreadth))/2,
        (minbreadth-8)/2
    ]
}


function drawlinesusingcoordinates(linecoordinates) {
    var c=document.getElementById("maincanvas");
    var ctx=c.getContext("2d");
    ctx.lineWidth=2;
    for(var i=0;i<linecoordinates.length;i += 4) {
        ctx.moveTo(linecoordinates[i],linecoordinates[i+1]);
        ctx.lineTo(linecoordinates[i+2],linecoordinates[i+3]);
        ctx.stroke();
    }
}

function drawcircleusingcoordinates(circlecoordinates) {
    var canvas = document.getElementById("maincanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(circlecoordinates[0],circlecoordinates[1],circlecoordinates[2],0,2*Math.PI);
    ctx.stroke();
}

function reloadpage() {
    location.reload();
}
function getlengthofhash(hash) {
    var count = 0;
    for (key in hash) {
        if (hash.hasOwnProperty(key)) {
            count += 1;
        }
    }
    return count;
}

function hasWonGame(array) {
    for(var i=0;i<possiblesolutions.length;i++) {
        var hasWon  = true;
        for(var j=0;j<possiblesolutions[i].length;j++) {
            if (array.indexOf(possiblesolutions[i][j]) == -1) {
                hasWon = false;
            }
        }
        if(hasWon) {
            return true;
        }
    }
    return false;
}

function isendofgame() {
    if(clickcount % 2 == 0) {
        if(hasWonGame(filledcircles)) {
            alert("Circles won the game");
            return true;
        }
    } else {
        if(hasWonGame(filledlines)) {
            alert("Lines won the game");
            return "true";
        }

    }
    if ((filledlines.length+filledcircles.length) == 9) {
        alert("Match Draw");
        return true;
    }
    return false;
}

