var lights = document.querySelectorAll('.light');
let chrono = document.querySelector('.chrono');
var minute = document.querySelector('.minute');
var second = document.querySelector('.second');
var micros = document.querySelector('.micros');
var init = document.getElementById('init');
var stop = document.getElementById('stop');
var reboot = document.getElementById('reboot');
var setter = document.getElementById('setter');
var min = 0, sec = 0, ms = 0, limit;
var interval = null;
var state = false;
var data = [];
var i;

function format(time)
{
    return time > 9 ? time : '0' + time; 
}

function print_time()
{
    minute.innerHTML = format(min);
    second.innerHTML = format(sec);
    micros.innerHTML = format(ms);

    if (min == limit) stop.click();
}

function init_chrono()
{
    function run()
    {
        ms++;
        if (ms > 99)
        {
            sec++;
            ms = 0;
        }

        if (sec > 59)
        {
            min++;
            sec = 0;
        }
        print_time();
    }

    interval = setInterval(run, 10);
}

function stop_chrono()
{
    clearInterval(interval);
    interval = null;
}

function reboot_chrono()
{
    clearInterval(interval);
    interval = null;
    min = 0; sec = 0; ms = 0;
    print_time();
}

function update_table()
{
    const table = document.getElementById('table');
    const tbody = table.querySelector('tbody');

    while(tbody.firstChild) tbody.removeChild(tbody.firstChild);

    data.forEach(element => 
    {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = element;
        tr.appendChild(td);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}

function on_light()
{
    lights[i].style.background = '#dc3545';
    lights[i].style.animationName = 'redShadow';
    setTimeout(() => 
    {
        i++;
        if (i < lights.length) on_light();
    }, 1000);

    setTimeout(() => 
    {
        lights.forEach(light => {
            light.style.background = '#54AD98';
            light.style.animationName = 'dark_shadow'; 
        })
    }, 3000);
}

init.addEventListener('click', () => 
{
    chrono.style.animationName = 'pinkShadow';
    chrono.style.color = '#a64772';
    i = 0;
    on_light();
    setTimeout(init_chrono, 3000);
    init.textContent = 'Continuar';
});

stop.addEventListener('click', () =>
{
    stop_chrono();
    data.push(format(min) + ':' + format(sec) + ':' + format(ms));
    update_table();

    lights.forEach(light =>
    {
        light.style.background = '#222323';
        light.style.animationName= 'yellowShadow';    
    })

    chrono.style.animationName = 'yellowShadow';
    chrono.style.color = '#e9c46a';
});

reboot.addEventListener('click', () =>
{
    reboot_chrono();
    init.textContent = 'Iniciar';
    data.splice(0, data.length);
    update_table();

    lights.forEach(light =>
    {
        light.style.background = '#222323';
        light.style.animationName= 'dark_shadow';    
    })
    chrono.style.animationName = 'pinkShadow';
    chrono.style.color = '#a64772';
});

setter.addEventListener('click', () =>
{
    let value = document.getElementById('limit').value;
    if (value > 0) limit = value;
    else limit = 1;
});
