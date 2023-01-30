function getCur(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    let id = document.getElementById('currValue').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let dates = [];
    let cur = [];

    xhr.open('GET', 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/' + id + '?startDate=' + startDate + ' &endDate=' + endDate);

    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert('Ошибка: ' + xhr.status);
            return;
        }
    };

    xhr.onprogress = function () {
        var answer = xhr.response
        var object = JSON.parse(answer)
        var date
        object.forEach(function (item) {
            date = item.Date
            date = date.slice(0, 10)
            dates.push(date);
            cur.push(item.Cur_OfficialRate);
        })
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    data: cur,
                    label: "Стоимость",
                    borderColor: "#3e95cd",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'График курса валют',
                }
            }
        });
    };
}

