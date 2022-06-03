/**
 * Created by zhengyan.gao on 2022/6/3.
 */
const text = '{"btccom":{"name":"BTC.com","title":"BTC.com","url":"https://www.btc.com/","search":"https://explorer.btc.com/search/{0}"},"etherscan":{"name":"Etherscan","title":"Etherscan","url":"https://etherscan.io/","search":"https://etherscan.io/search?q={0}"}}';
const explorers = JSON.parse(text);
var selectElement = document.getElementById('select-explorers');
for (const explorer in explorers) {
    // Option(text, value)
    selectElement.add(new Option(explorers[explorer].name, explorer));
}
$('select').selectpicker();
$(document).ready(function () {
    const format = (str2Format, ...args) => str2Format.replace(/(\{\d+\})/g, a => args[+(a.substr(1, a.length - 2)) || 0] );
    // onclick
    $("#search").click(function () {
        address = $("#content").val();
        address = $.trim(address);
        type = $("#select-explorers").val();
        if (address.length === 0) {
            toastr.warning('请填写内容.');
            return;
        }
        if (!(type in explorers)) {
            toastr.warning('配置错误.');
            return;
        }
        let url = format(explorers[type].search, address);
        console.log(url);   
        var $btn = $(this);
        $btn.button('loading');
        // new window open
        var win = window.open(url);
        $btn.button('reset');
    });
});
