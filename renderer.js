// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.onload = function(){
    // gender selector radio buttons click event handler
    document.getElementById("male-option").addEventListener("click", handleGenderSelectorClick);
    document.getElementById("female-option").addEventListener("click", handleGenderSelectorClick);

    // Gender selection event handler
    function handleGenderSelectorClick(){
        if (document.getElementById("male-option").checked){
            hideHipCircumfrenceField(true);
        }
        else{
            hideHipCircumfrenceField(false);
        }
    }

    function commonInputsValid(){
        if (document.getElementById("age").value.length!=0 &&
            document.getElementById("height").value.length!=0 &&
            document.getElementById("weight").value.length!=0 &&
            document.getElementById("w-circ").value.length!=0 &&
            document.getElementById("n-circ").value.length!=0)
            {
                return true;
            }
            else
            {
                return false;
            }
    }

    function showInputAlert(){
        alert("Please complete all required fields!");
    }

    // "Calculate" button click event handler
    document.getElementById("calculate-button").addEventListener("click", function(){
        // validate input
        if (document.getElementById("male-option").checked)
        {
            if (!commonInputsValid())
            {
                showInputAlert();
                return;
            }
        }
        else
        {
            if (!commonInputsValid() || document.getElementById("h-circ").value.length==0)
            {
                showInputAlert();
                return;
            }
        }

        // calculate body mass index
        var height = Number(document.getElementById("height").value);
        var weight = Number(document.getElementById("weight").value);
        var bmi = calculateBMI(height, weight);

        // calculate body fat percentage and show results in the document
        var waistCircumfrence = Number(document.getElementById("w-circ").value);
        var neckCircumfrence = Number(document.getElementById("n-circ").value);
        if (document.getElementById("male-option").checked){
            var bfp = calculateBFPmale(waistCircumfrence, neckCircumfrence, height);

            displayResults(bmi, bfp);
        }
        else{
            var hipCircumfrence = Number(document.getElementById("h-circ").value);
            var bfp = calculateBFPfemale(waistCircumfrence, neckCircumfrence, height, hipCircumfrence);

            displayResults(bmi, bfp);
        }
        
    }, false);

    // "Clear" button click event handler
    document.getElementById("clear-button").addEventListener("click", function(){
        // clear results
        document.getElementById("bmi-result").innerHTML = "BMI:";
        document.getElementById("bfp-result").innerHTML = "Body Fat:";

        // clear input fields
        document.getElementById("age").value = "";
        document.getElementById("height").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("w-circ").value = "";
        document.getElementById("h-circ").value = "";
        document.getElementById("n-circ").value = "";
    }, false);
}

function calculateBMI(height, weight){
    return (weight / Math.pow((height/100), 2));
}

function calculateBFPmale(waist, neck, height){
    return 495/(1.0324-0.19077*Math.log10(waist-neck) + 0.15456*Math.log10(height))-450;
}

function calculateBFPfemale(waist, neck, height, hip){
    return 495/(1.29579-0.35004*Math.log10(waist+hip-neck) + 0.22100*Math.log10(height))-450;
}

function hideHipCircumfrenceField(hide){
    if (hide){
       document.getElementById("hc-group").style.display = "none";
    }
    else{
        document.getElementById("hc-group").style.display = "block";
    }
}

function displayResults(bmi, bfp){
    document.getElementById("bmi-result").innerHTML = ("BMI: " + bmi);
    document.getElementById("bfp-result").innerHTML = ("Body Fat: " + bfp + "%");
}