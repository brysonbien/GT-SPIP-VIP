const median = (data) => {
    const length = data.length;
    return length % 2 === 0
        ? (data[length / 2 - 1] + data[length / 2]) / 2
        : data[Math.floor(length / 2)];
};

export const percentage = (value = 0, min = 0, max = 1) => {
    return (100 * (value - min)) / (max - min);
};

export const summaryStats = (data) => {
    const length = data.length;
    data.sort((a, b) => a - b);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const med = median(data);
    const q1 = median(data.slice(0, Math.floor(length / 2)));
    const q3 = median(data.slice(Math.ceil(length / 2)));
    return {
        min,
        max,
        q1,
        med,
        q3,
    };
};
