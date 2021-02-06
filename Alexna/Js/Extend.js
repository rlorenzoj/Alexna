/*
 * Versión:         1.0
 * Fecha:           22-02-2021
 * Autor:           Rafael Lorenzo Jiménez
 * Propósito:       Extensión de funciones de js.
 * Versiones:
 *      1.0     22-02-2021      Rafael Lorenzo
 *                  - Versión inicial.
 */

Date.prototype.toFecha = function (locale) {
    locale = locale || 'es';
    var fecha = this;
    if (fecha) {
        switch (locale.toLowerCase()) {
            case 'en':
                return (fecha.getMonth() + 1).pad(2) + '/' + fecha.getDate().pad(2) + '/' + fecha.getFullYear();
            case 'es':
            default:
                return fecha.getDate().pad(2) + '/' + (fecha.getMonth() + 1).pad(2) + '/' + fecha.getFullYear();
        }
    } else {
        return null;
    }
}

Date.prototype.toFechaDate = function () {
    let fecha = this;
    if (fecha) {
        return '\/Date(' + fecha.getTime() + (fecha.getTimezoneOffset >= 0 ? '+' : '') + (fecha.getTimezoneOffset() * 100 / 60).pad(4) + ')\/';
    } else {
        return null;
    }
}

Date.prototype.toFechaAnoMesDia = function () {
    var fecha = this;
    if (fecha) {
        return fecha.getFullYear() + (fecha.getMonth() + 1).pad(2) + fecha.getDate().pad(2);
    } else {
        return null;
    }
}

Date.prototype.ultimoDiaMes = function () {
    if (this) {
        var fecha = new Date(this);
        fecha = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1, 0, 0, 0, 0);
        fecha.setDate(fecha.getDate() - 1);
        return fecha;
    } else {
        return null;
    }
}


Number.prototype.bytesToFileSize = function () {
    let fileSizeInBytes = this;
    let i = -1;
    let byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

Number.prototype.minutesToHours = function () {
    var negativo = this < 0 ? true : false;
    var valor = Math.abs(this);
    var s = Math.floor(valor / 60) + ':' + (valor % 60).pad(2);
    return (negativo ? '-' : '') + s;
}

Number.prototype.minutesToHoursNumber = function () {
    var negativo = this < 0 ? true : false;
    var valor = Math.abs(this);
    var dec = parseInt(((valor % 60) / 6) * 10, 10);
    var s = parseFloat(Math.floor(valor / 60) + '.' + (dec < 10 ? '0' : '') + dec);
    if (negativo) s = -1 * s;
    return s;
}

Number.prototype.pad = function (size) {
    let negativo = this < 0;
    var s = String(Math.abs(this));
    while (s.length < (size || 2)) { s = "0" + s; }
    return (negativo ? '-' : '') + s;
}

Number.prototype.redondear = function (decimales) {
    let num = this;
    var signo = (num >= 0 ? 1 : -1);
    decimales = typeof decimales !== "undefined" ? decimales : 0;
    num = num * signo;
    if (decimales === 0) {
        return signo * Math.round(num);
    }
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}


String.prototype.aFecha = function () {
    let dateString = this;
    if (!dateString) {
        return null;
    } else {
        let reggie = /(\d{4})\/(\d{2})\/(\d{2})/;
        let dateArray = reggie.exec(dateString);
        return new Date(
            (+dateArray[1]),
            (+dateArray[2]) - 1, // Careful, month starts at 0!
            (+dateArray[3])
        );
    }
}

String.prototype.aFechaHora = function () {
    let dateString = this;
    if (!dateString) {
        return null;
    } else {
        let reggie = /(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/;
        let dateArray = reggie.exec(dateString);
        return new Date(
            (+dateArray[1]),
            (+dateArray[2]) - 1, // Careful, month starts at 0!
            (+dateArray[3]),
            (+dateArray[4]),
            (+dateArray[5])
        );
    }
}

String.prototype.capitalize = function () {
    var s = this;
    if (s === null) {
        return null;
    } else {
        s = s.toLowerCase();
        var temp = s.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
        temp = temp.replace(/(?:^|\+)\S/g, function (a) { return a.toUpperCase(); });
        temp = temp.replace(/(?:^|\-)\S/g, function (a) { return a.toUpperCase(); });
        temp = temp.replace(/(?:^|\.)\S/g, function (a) { return a.toUpperCase(); });
        temp = temp.replace(/\sY\s/g, ' y ').replace(/\sE\s/g, ' e ').replace(/\sDe\s/g, ' de ').replace(/\sLos\s/g, ' los ').replace(/\sLa\s/g, ' la ');
        return temp;
    }
};

String.prototype.formato = function () {
    var s = this;
    var args = arguments;

    if (!s.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
        throw new Error('Formato de cadena inválido.');
    }


    return s.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, function (m, str, index) {
        if (str) {
            return str.replace(/(?:{{)|(?:}})/g, function (m) { return m[0]; });
        } else {
            if (index >= args.length) {
                throw new Error('El índice del argumento está fuera de rango en format.');
            }
            return args[index];
        }
    });
}

String.prototype.isFechaHora = function () {
    let dateString = this;
    if (!dateString) {
        return false;
    } else {
        let reggie = /(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/;
        return reggie.test(dateString);
    }
}

String.prototype.JsonToDate = function () {
    var jsonDateString = this;
    if (jsonDateString === null) {
        return null;
    } else {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }
}

String.prototype.validateEmail = function () {
    let email = this;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

String.prototype.validateNumber = function () {
    let s = this;
    return !isNaN(s);
}
