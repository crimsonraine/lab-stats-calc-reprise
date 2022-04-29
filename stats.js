function readAllNumbers() {
    var textArea = document.querySelector("textarea");
    var lines = textArea.value.split("\n");
    var numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] === "")
            continue;
        var numStrs = lines[i].split(' ');
        for (var _i = 0, numStrs_1 = numStrs; _i < numStrs_1.length; _i++) {
            var numStr = numStrs_1[_i];
            if (isNaN(Number(numStr)))
                continue;
            numbers.push(Number(numStr));
        }
    }
    return numbers;
}
function getMean(nums) {
    var sum = 0;
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var n = nums_1[_i];
        sum += n;
    }
    return sum / nums.length;
}
function getAboveBelowMean(nums) {
    var mean = getMean(nums);
    var aboveCount = 0;
    var belowCount = 0;
    for (var _i = 0, nums_2 = nums; _i < nums_2.length; _i++) {
        var n = nums_2[_i];
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
// PART A : Basic Stats
function getMedian(nums) {
    //Step 1
    if (nums.length % 2 === 1)
        return nums[(nums.length - 1) / 2]; // mid index
    else
        return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2; // avg 2 mids
}
function getMinMax(nums) {
    //Step 2
    return [nums[0], nums[nums.length - 1]];
}
function getStdDev(nums) {
    //Step 3
    var mean_nums = getMean(nums);
    var sq_distances = []; // collect squared distances
    for (var _i = 0, nums_3 = nums; _i < nums_3.length; _i++) {
        var num = nums_3[_i];
        sq_distances.push(Math.pow((mean_nums - num), 2));
    }
    return Math.pow(getMean(sq_distances), (1 / 2)); // square root of mean of sq_distances
}
var basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    var numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#mean").textContent = "".concat(getMean(numbers));
    document.querySelector("#aboveBelow").textContent = "".concat(getAboveBelowMean(numbers).join(" & "));
    document.querySelector("#median").textContent = "".concat(getMedian(numbers));
    document.querySelector("#minMax").textContent = "".concat(getMinMax(numbers).join(" & "));
    document.querySelector("#stdDev").textContent = "".concat(getStdDev(numbers));
});
// PART B: Advanced Integer Stats
function getLeastCommonMultiple(nums) {
    var multiple = Number(nums[nums.length - 1]);
    var incrementNum = Number(nums[nums.length - 1]);
    var lcm = nums.every(function (num) { return (multiple % num === 0); });
    while (lcm != true) {
        multiple += incrementNum;
        lcm = nums.every(function (num) { return (multiple % num === 0); });
    }
    return multiple;
}
function getAllCommonFactors(nums) {
    var smallest = nums[0];
    var gcfs = [1];
    var _loop_1 = function (i) {
        if (nums.every(function (num) { return (num % i === 0); }))
            gcfs.push(i);
    };
    for (var i = 2; i <= smallest; i++) {
        _loop_1(i);
    }
    return gcfs;
}
var advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    var numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = "".concat(getLeastCommonMultiple(numbers));
    document.querySelector("#factors").textContent = "".concat(getAllCommonFactors(numbers).join(", "));
});
