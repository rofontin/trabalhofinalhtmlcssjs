$(document).ready(function () {
    var fromJson = $("#dropzone2");

    $("#cardNumber, #cardNumber2").on("click", function () {
        var json = record(fromJson);
        addDataTable(json);
    });

    $("#cardNumber, #cardNumber2").focusout(function () {
        var json = record(fromJson);
        addDataTable(json);
    });
});

function allowDrop(ev) {
    ev.preventDefault();
}

function denyDrop(ev) {
    ev.stopPropagation();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function leave(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var fromJson = $("#dropzone2");
    var json = record(fromJson);

    addDataTable(json);
}

function record(fromJson) {
    var articles = fromJson.find('article');
    if (articles.length > 0) {
        var totalItens = 0;
        var valorTotal = 0;

        articles.each(function (idx, article) {
            let id = article.id;
            let articleInputTotal = $("#" + id).find('input[type="number"]');
            let articleInputValor = $("#" + id).find('input[type="text"]');
            valorTotal += (Number($(articleInputTotal).val())) * (Number($(articleInputValor).val()))
            totalItens += (Number($(articleInputTotal).val()));
        });

        var inputTotal = fromJson.find('input[type="number"]');
        var inputValor = fromJson.find('input[type="text"]');
        var json = "";

        json += `"${$(inputTotal).attr("name")}": "${totalItens}"`;
        json += ",";
        json += `"${$(inputValor).attr("name")}": "${parseFloat(valorTotal).toFixed(2)}"`;

        json = `{${json}}`;
        return JSON.parse(json);
    }
}

function addDataTable(valores) {
    var tdTotalItens = $("#total-itens");
    var tdValorTotal = $("#valor-total");

    if (valores) {
        tdTotalItens.text("UND: " + valores['qtde']);
        tdValorTotal.text("R$: " + valores['valor']);
    } else {
        tdTotalItens.text("UND: " + 0);
        tdValorTotal.text("R$: " + 0);
    }
}