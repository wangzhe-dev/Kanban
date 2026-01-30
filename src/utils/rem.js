/*
 *@Description: 自动获取分辨率
 *@ClassAuthor: zhaijs
 *@Date       : 2021-07-10 14: 15: 00
*/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>375&&clientWidth<=1440){
                clientWidth = 1440
            }
            if(clientWidth>=1920) {
                clientWidth = 1920
            }
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);