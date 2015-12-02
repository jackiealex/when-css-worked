window.loadCSS = function  (href,a,c, xx, done) {
    var   
        head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.type = "text/css"; 
    link.rel = "stylesheet";
  

    // MAGIC 
    // call done() when CSS arrives
    head.appendChild(link);
    link.onload = function () {
        done('onload listener');
    };   

    // #2   
    if (link.addEventListener) {
        link.addEventListener('load', function() {
            done("DOM's load event");
        }, false);   
    };   

    // #3   
    link.onreadystatechange = function() {
        var state = link.readyState;
        if (state === 'loaded' || state === 'complete') {
            link.onreadystatechange = null;
            done("onreadystatechange");
        }   
    };

    // #4   
    var cssnum = document.styleSheets.length;
    var ti = setInterval(function() {
        if (document.styleSheets.length > cssnum) {
            // needs more work when you load a bunch of CSS files quickly
            // e.g. loop from cssnum to the new length, looking
            // for the document.styleSheets[n].href === url
            // ...
            // FF changes the length prematurely :(
            done('listening to styleSheets.length change');
            clearInterval(ti);
        }   
    }, 16);
    link.href = href;
}