/**
 * @Wlly1618 Solano Wilfredo Joel
 */

var lights = document.querySelectorAll('.light');
var timer = document.getElementById('timer');
var time = document.getElementById('time');
var ms = document.getElementById('ms');
var i;
var j = 0;
var total = '00:00:000'
let init_time;
let interval_time;

function changeColor() {
    lights[i].style.background = '#AC3249';
    lights[i].style.boxShadow = '0px 0px 20px 10px #E1E1E1';
    setTimeout(() => {
        i++;
        if (i < lights.length) changeColor();
    }, 1000);

    setTimeout(() => {
        lights.forEach(x => {
            x.style.background = '#54AD98';
            x.style.animationName = 'grayshadow';
        });
    }, 3100);
}

function f1(value) {
    return value < 10 ? `0${value}` : value;
}

function f2(value) {
    if (value < 10) return `00${value}`;
    else if (value < 100) return `0${value}`;
    else return value;
}

function actualizarCronometro() {
    const tiempoActual = Date.now() - init_time;
    const milisegundos = tiempoActual % 1000;
    const segundos = Math.floor(tiempoActual / 1000) % 60;
    const minutos = Math.floor(tiempoActual / 60000);

    time.textContent = `${f1(minutos)}:${f1(segundos)}`;
    ms.textContent = `:${f2(milisegundos)}`;
}

function addTimes(t1, t2) {
    function actms(time) {
        const split = time.split(':');
        const min = parseInt(split[0], 10) || 0; 
        const seg = parseInt(split[1], 10) || 0;
        const ms = parseInt(split[2], 10) || 0;
        return min * 60 * 1000 + seg * 1000 + ms;
    }

    function msToStr(ms) {
        const min = Math.floor(ms / (60 * 1000));
        const seg = Math.floor((ms % (60 * 1000)) / 1000);
        const last = ms % 1000;
        return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}:${last.toString().padStart(3, '0')}`;
    }

    const msTotal = actms(t1) + actms(t2);
    return msToStr(msTotal);
}

function actTable(ite, time) {
    const table = document.getElementById('data');
    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');
    const iterator = document.createElement('td');
    const times = document.createElement('td');
    
    iterator.textContent = ite;
    times.textContent = time;
    row.appendChild(iterator);
    row.appendChild(times);
    tbody.appendChild(row);

    const footer = document.getElementById('total');
    total = addTimes(total, time);    
    footer.textContent = `Total: ${total}`;
}


document.getElementById('pause').addEventListener('click', () => {
    clearInterval(interval_time);
    timer.style.animationName = 'yellowShadow';
    time.style.color = '#DFDFA0';
    ms.style.color = '#DFDFA0';
    lights.forEach(x => {
        x.style.background = '#303030'
        x.style.animationName = 'yellowShadow';
    });
    j++;
    actTable(j, (time.textContent + ms.textContent));
});

document.getElementById('init').addEventListener('click', () => {
    init_time = 0;
    i = 0;
    time.style.color = '#a64772';
    ms.style.color = '#a64772';
    time.textContent = '00:00:';
    ms.textContent = '000';
    timer.style.animationName = 'pinkShadow';
    lights.forEach(x => {
        x.style.animationName = 'none'
    });
    changeColor();
    clearInterval(interval_time);
    setTimeout(() => {
        init_time = Date.now() - (init_time ? init_time : 0);
        interval_time = setInterval(actualizarCronometro, 10);
    }, 3100);
});