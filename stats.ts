function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        if (lines[i] === "")
            continue;
        let numStrs : string[] = lines[i].split(' ');
        for (let numStr of numStrs) {
            if (isNaN(Number(numStr)))
                continue;
            numbers.push(Number(numStr))
        }
    }
    return numbers;
}

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return sum / nums.length;
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    //Step 1
    if (nums.length % 2 === 1)
        return nums[(nums.length - 1) / 2]; // mid index
    else
        return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2; // avg 2 mids
}

function getMinMax(nums : number[]) : [number, number] {
    //Step 2
    return [nums[0], nums[nums.length -1]];
}

function getStdDev(nums : number[]) : number {
    //Step 3
    let mean_nums = getMean(nums);
    let sq_distances = []; // collect squared distances
    for (const num of nums){
        sq_distances.push((mean_nums - num) ** 2);
    }
    return getMean(sq_distances) ** (1/2); // square root of mean of sq_distances
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let multiple : number = Number(nums[nums.length - 1]);
    let incrementNum = Number(nums[nums.length - 1]);

    let lcm : Boolean = nums.every((num) => {return(multiple % num === 0)});
    while (lcm != true) {
        multiple += incrementNum;
        lcm = nums.every((num) => {return(multiple % num === 0)});
    }
    return multiple;
}

function getAllCommonFactors(nums : number[]) : number[] {
    let smallest : number = nums[0];
    let gcfs : number[] = [1]
    for (let i : number = 2; i <= smallest; i++) {
        if (nums.every((num) => {return(num % i === 0)}))
            gcfs.push(i)
    }
    return gcfs;
}

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});