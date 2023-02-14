const XLSX = require("xlsx");

const spreadsheet = XLSX.readFile(
    "Practice Matrix Georgia Tech Basketball.xlsx"
);
const drillData = XLSX.utils.sheet_to_json(
    spreadsheet.Sheets["Drill Load Baselines"]
);
const fields = Object.keys(drillData[0]).filter(
    (key) => key !== "Date" && key !== "Drill"
);
const fieldEntries = fields.map((key) => [key, 0]);

const drillMap = drillData.reduce((map, row) => {
    if (!map.has(row.Drill)) {
        map.set(row.Drill, []);
    }
    map.get(row.Drill).push(row);
    return map;
}, new Map());

const drillAvgs = [...drillMap.entries()].map(([drillName, rows]) => {
    const avgs = Object.fromEntries(fieldEntries);
    rows.forEach((row) => {
        fields.forEach((field) => {
            avgs[field] += row[field];
        });
    });
    fields.forEach((field) => {
        avgs[field] /= rows.length;
    });
    return [drillName, avgs];
});

module.exports = { metrics: fields, avgs: drillAvgs };
