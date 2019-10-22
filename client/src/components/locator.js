// Calcul du Locator à partir des coordonnées géographiques.Calcul

const locator = (longitude, latitude) => {
    if ((longitude >= -180) && (longitude <= 180) && (latitude >= -90) && (latitude <= 90)) {
        longitude += 180;
        latitude += 90;

        var lo1 = Math.trunc(longitude / 20);
        var la1 = Math.trunc(latitude / 10);

        var lor = longitude - (20 * lo1);
        var lar = latitude - (10 * la1);

        var lo2 = Math.trunc(lor/2);
        var la2 = Math.trunc(lar);
        lor = lor - (2*lo2);
        lar = lar - (la2);

        var lo3 = Math.trunc(lor*12);
        var la3 = Math.trunc(lar*24);

        lo1 = String.fromCharCode(65 + lo1);
        la1 = String.fromCharCode(65 + la1);
        lo3 = String.fromCharCode(65 + lo3);
        la3 = String.fromCharCode(65 + la3);

        return lo1+la1+lo2+la2+lo3+la3;
    } else {
        return '';
    }
}

module.exports = locator
