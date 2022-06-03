/**
 * Created by zhengyan.gao on 2017/7/8.
 */
function printDate(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
var explorers = [
    "btc.com"
];
$('select').selectpicker();
// charts
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    navy: 'rgb(0, 0, 128)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    black: 'rgb(0, 0, 0)',
    maroon: 'rgb(128, 0, 0)',
    gold: 'rgb(255, 215, 0)',
    seagreen: 'rgb(46, 139, 87)',
    lightslategray: 'rgb(119, 136, 153)'
};
// var ctx = document.getElementById('chart').getContext('2d');
var pooldatasets = [{
    label: "btc.com",
    data: [],
    backgroundColor: window.chartColors.red,
    borderColor: window.chartColors.red,
    fill: false,
    pointRadius: 0
}];
var config = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: explorers,
        datasets: pooldatasets
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'month',
                    tooltipFormat: 'll'
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,
                    beginAtZero: true
                }
            }]
        },
        // Container for zoom options
        zoom: {
            // Boolean to enable zooming
            enabled: true,
            // Enable drag-to-zoom behavior
            drag: false,
            // Zooming directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'y',
            rangeMin: {
                // Format of min zoom range depends on scale type
                x: null,
                y: -0.1
            },
            rangeMax: {
                // Format of min zoom range depends on scale type
                x: null,
                y: 100
            },
            limits: {
                max: 10,
                min: 0.01
            }
        }
    }
};
// var chart = new Chart(ctx, config);

$(document).ready(function () {
    $('#chart').hide();
    // onclick
    $("#search").click(function () {
        $('#chart').hide();
        address = $("#address").val();
        address = $.trim(address);
        type = $("#type").val();
        if (address.indexOf(":") > 0 || address.indexOf("：") > 0 || address.indexOf(" ") > 0 || address.indexOf("\t") > 0) {
            if (type === 0) {
                $('#color').attr('class', 'panel panel-warning');
                $("#re").html("请选择货币类型.");
                return;
            }
        }
        if (address.length === 0) {
            $('#color').attr('class', 'panel panel-danger');
            $("#re").html("请填写地址.");
            return;
        }
        var $btn = $(this);
        $btn.button('loading');
        $.post("history/get", {address: address, type: type},
            function (result) {
                var error = result.status;
                var dataa = result.error_msg;
                if (error === 0) {
                    $('#color').attr('class', 'panel panel-success');
                    toastr.success(dataa)
                } else if (error === 1) {
                    $('#color').attr('class', 'panel panel-warning');
                    toastr.warning(dataa)
                }
                $btn.button('reset');
            }, "json");
    });
});
$(function () {
    $(".select-ul a").click(function (event) {
        $(".search-select").text($(this).text()).attr('name', $(this).attr('name'));
        $(".endselect").attr('value', $(this).attr('name'));
    });
});

// // websocket
// url = 'wss://';
// // url = 'ws://127.0.0.1:8080/ws';
// c = new WebSocket(url);

// send = function (data) {
//     c.send(data)
// };

// c.onmessage = function (msg) {
// };

// c.onopen = function () {};