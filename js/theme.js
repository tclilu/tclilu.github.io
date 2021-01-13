Storage.prototype.setExpire = (key, value, expire) => {
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire
    };
    localStorage.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getExpire = key => {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}
let expireTime1H = 1000 * 60 * 60; // 1小时过期
function isNightRange(beginTime, endTime) {
    let nowDate = new Date();
    let nowTime = nowDate.getHours() + ":" + nowDate.getMinutes();
    let strb = beginTime.split(":");
    if (strb.length !== 2) {
        return false;
    }
    let stre = endTime.split(":");
    if (stre.length !== 2) {
        return false;
    }
    let strn = nowTime.split(":");
    if (stre.length !== 2) {
        return false;
    }
    let b = new Date();
    let e = new Date();
    let n = new Date();
    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    n.setHours(strn[0]);
    n.setMinutes(strn[1]);
    return n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0;
}

function isNightFun() {
    let isNightTemp = localStorage.getExpire('night');
    // 第一次进来判断是白天还是晚上
    if (isNightTemp === null || isNightTemp === undefined) {
        isNightTemp = isNightRange("19:00", "23:59") || isNightRange("00:00", "07:00") ? 'true' : 'false';
        localStorage.setExpire("night", isNightTemp, expireTime1H);
    }
    return isNightTemp;
}
let isNight=isNightFun();
// 参考自 https://www.imaegoo.com/
let nightNav;
let nightIcon;
let navBarLogo = document.getElementsByClassName('navbar-logo');
let footerLogo = document.getElementsByClassName('footer-logo');

function applyNight(value) {
    if (value === 'true') {
        document.body.className += ' night'
        if (nightIcon) {
            nightIcon.className = nightIcon.className.replace(/ fa-moon/g, '') + ' fa-lightbulb'
        }
        navBarLogo[0].querySelector('img').src='https://cdn.jsdelivr.net/gh/sunchaser-lilu/sunchaser-cdn@master/sunchaser/sunchaser_logo_02.png'
        footerLogo[0].querySelector('img').src='https://cdn.jsdelivr.net/gh/sunchaser-lilu/sunchaser-cdn@master/sunchaser/sunchaser_logo_02.png'
    } else {
        document.body.className = document.body.className.replace(/ night/g, '')
        if (nightIcon) {
            nightIcon.className = nightIcon.className.replace(/ fa-lightbulb/g, '') + ' fa-moon'
        }
        navBarLogo[0].querySelector('img').src='https://cdn.jsdelivr.net/gh/sunchaser-lilu/sunchaser-cdn@master/sunchaser/sunchaser_logo_01.png'
        footerLogo[0].querySelector('img').src='https://cdn.jsdelivr.net/gh/sunchaser-lilu/sunchaser-cdn@master/sunchaser/sunchaser_logo_01.png'

    }
}

function findNightIcon() {
    nightNav = document.getElementById('night-nav');
    nightIcon = document.getElementById('night-icon');
    if (!nightNav || !nightIcon) {
        setTimeout(findNightIcon, 100);
    } else {
        nightNav.addEventListener('click', switchNight);
        nightIcon.className = isNight ? nightIcon.className.replace(/ fa-moon/g, '') + ' fa-lightbulb' : nightIcon.className.replace(/ fa-lightbulb/g, '') + ' fa-moon';
    }
}

function switchNight() {
    isNight = isNight === 'false' ? 'true' : 'false';
    applyNight(isNight);
    localStorage.setExpire('night', isNight, expireTime1H);
    if(typeof loadUtterances == 'function'){
        loadUtterances();
    }
}

findNightIcon();
applyNight(isNight);