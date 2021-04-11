// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const dialog = require('electron').remote.dialog;

window.$ = window.jQuery = require('jquery');

window.onload = function() {
    // gender selector radio buttons click event 
    $(document).on('click', '#male-option', function(event){ handleGenderSelectorClick() });
    $(document).on('click', '#female-option', function(event){ handleGenderSelectorClick() });

    // Gender selection event handler
    function handleGenderSelectorClick() {
        if ($('#male-option').is(":checked"))
        {
            hideHipCircumfrenceField(true);
        }
        else
        {
            hideHipCircumfrenceField(false);
        }
    }

    function commonInputsValid() {
        if ( $('#age').val().length != 0 && 
             $('#height').val().length != 0 &&
             $('#weight').val().length != 0 &&
             $('#w-circ').val().length != 0 &&
             $('#n-circ').val().length != 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function showInputAlert() {
        dialog.showErrorBox("Fitness Calculator", "Please complete all required fields!");
    }

    // "Calculate" button click event handler
    $(document).on('click', '#calculate-button', function(event)
    {
        // validate input
        if ($('#male-option').is(":checked"))
        {
            if (!commonInputsValid())
            {
                showInputAlert();
                return;
            }
        }
        else
        {
            if (!commonInputsValid() || $('#h-circ').val().length==0)
            {
                showInputAlert();
                return;
            }
        }

        // calculate body mass index
        var height = Number($('#height').val());
        var weight = Number($('#weight').val());
        var bmi = calculateBMI(height, weight);

        // calculate body fat percentage
        // show results in document
        var waistCircumfrence = Number($('#w-circ').val());
        var neckCircumfrence = Number($('#n-circ').val());
        if (document.getElementById("male-option").checked)
        {
            var bfp = calculateBFPmale(waistCircumfrence, neckCircumfrence, height);

            displayResults(bmi, bfp);
        }
        else
        {
            var hipCircumfrence = Number($('#h-circ').val());
            var bfp = calculateBFPfemale(waistCircumfrence, neckCircumfrence, height, hipCircumfrence);

            displayResults(bmi, bfp);
        }    
    });

    // "Clear" button click event handler
    $(document).on('click', '#clear-button', function(event) {
        // clear results
       $('#bmi-result').html("BMI:");
       $('#bfp-result').html("Body Fat:");

        // clear input fields
        $('#age').val("");
        $('#height').val("");
        $('#weight').val("");
        $('#w-circ').val("");
        $('#h-circ').val("");
        $('#n-circ').val("");
    });
}

function calculateBMI(height, weight) {
    return (weight / Math.pow((height/100), 2));
}

function calculateBFPmale(waist, neck, height) {
    return 495/(1.0324-0.19077*Math.log10(waist-neck) + 0.15456*Math.log10(height))-450;
}

function calculateBFPfemale(waist, neck, height, hip) {
    return 495/(1.29579-0.35004*Math.log10(waist+hip-neck) + 0.22100*Math.log10(height))-450;
}

function hideHipCircumfrenceField(hide) {
    if (hide)
    {
       $('#hc-group').css("display", "none");
    }
    else
    {
        $('#hc-group').css("display", "block");
    }
}

function displayResults(bmi, bfp) {
   $('#bmi-result').html("BMI: " + bmi.toFixed(1));
   $('#bfp-result').html("Body Fat: " + bfp.toFixed(1) + "%");
}