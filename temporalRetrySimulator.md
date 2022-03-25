<style>
    .double-sided {
        display:flex;
        justify-content: space-evenly;
    }
    .retry-container {
        display: flex;
        flex-direction: column;
        width: 25%;
    }
    .add-button {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .retry-policy-container {
        display: flex;
        width: 25%; /* Width of the outside container */
        flex-direction: column;

    }

    .label-container {
        display: flex;
        justify-content: space-evenly;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .label-container-item {
        width: 200px;
    }

    .slider {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        width: 100%; /* Full-width */
        height: 25px; /* Specified height */
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
        border-radius: 5px;
    }

    .result, .launch {
        padding-top:25px;
        margin:auto;
        width: 50%;
        text-align:center
    }

    .launch-button {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .new-item-container {
        display: flex;
        justify-content: space-evenly;
    }

    .new-item {
        text-align: center;
        padding-top: 15px;
        padding-bottom: 15px;
        border: 1px solid white;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100px;
    }
    
    .new-item-button {
        width: 100px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .new-item-input {
        width: 50px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
<div class="double-sided">
<div class="retry-container">
    <h1>Retries</h1>
    <button class="add-button" onclick="addRetry()">+ Add</button>
</div>
<div class="retry-policy-container">
    <h1>Retry Policy (in ms)</h1>
    <div class="label-container">
    <div class="label-container-item" id="start-label">StartToCloseTimeout</div>
    <input class="label-container-item" id="start-input">
    </div>
    <input type="range" class="slider" id="start">
    <div class="label-container">
    <div class="label-container-item" id="backOff-label">backoffCoefficient</div>
    <input class="label-container-item" id="backOff-input">
    </div>
    <input type="range" class="slider" id="backOff">
    <div class="label-container">
    <div class="label-container-item" id="initial-label">initialInterval</div>
    <input class="label-container-item" id="initial-input">
    </div>
    <input type="range" class="slider" id="initial">
    <div class="label-container">
    <div class="label-container-item" id="attempts-label">maximumAttempts</div>
    <input class="label-container-item" id="attempts-input">
    </div>
    <input type="range" class="slider" id="attempts">
    <div class="label-container">
    <div class="label-container-item" id="interval-label">maximumInterval</div>
    <input class="label-container-item" id="interval-input">
    </div>
    <input type="range" class="slider" id="interval">
</div>
</div>
<div class="launch">
    <button class="launch-button" onclick="delayRetry()">
        Run Sim
    </button>
</div>
<div class="result">
<h1 id="display-result"></h1>
</div>
<script>
    console.log('Hello Computer!')
    function addRetry() {
        console.log('One More Chance!');
        const container = document.createElement('div');
        container.classList.add('new-item-container');
        const list = document.querySelector('.retry-container');
        list.insertBefore(container, document.querySelector('.add-button'));
        const text = document.createElement('select');
        text.classList.add('new-item');
        const succeed = document.createElement('option');
        succeed.innerText = 'Succeeds after';
        text.appendChild(succeed);
        const failure = document.createElement('option');
        failure.innerText = 'Fails after';
        text.appendChild(succeed);
        text.appendChild(failure);
        const button = document.createElement('button');
        button.innerText = 'Remove Item';
        button.classList.add('new-item-button');
        button.onclick = function removeRetry(event) {
            event.target.parentElement.remove();
        }
        const input = document.createElement('input');
        input.classList.add('new-item-input');
        let itemNumber = Array.from(document.querySelectorAll('.new-item-input')).length+1;
        input.id = `new-item-input-${itemNumber}`;
        container.appendChild(text);
        container.appendChild(input);
        container.appendChild(button);
    }
    
    function reflectChange(slider, newValue) {
        slider.value = newValue;
    }
    const start = document.querySelector('#start');
    const startInput = document.querySelector('#start-input');
    startInput.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            reflectChange(start, event.target.value.replace(/\D/g, ''));
        }
    });
    // Update the current slider value (each time you drag the slider handle)
    start.oninput = function() {
        startInput.value = this.value;
    }
    const backOff = document.querySelector('#backOff');
    const backOffInput = document.querySelector('#backOff-input');
    backOffInput.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            reflectChange(backOff, event.target.value.replace(/\D/g, ''));
        }
    });
    backOff.oninput = function() {
        backOffInput.value = this.value;
    }
    const initial = document.querySelector('#initial');
    const initialInput = document.querySelector('#initial-input');
    initialInput.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            reflectChange(initial, event.target.value.replace(/\D/g, ''));
        }
    });
    initial.oninput = function() {
        initialInput.value = this.value;
    }
    const attempts = document.querySelector('#attempts');
    const attemptsInput = document.querySelector('#attempts-input');
    attemptsInput.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            reflectChange(attempts, event.target.value.replace(/\D/g, ''));
        }
    });
    attempts.oninput = function() {
     attemptsInput.value = this.value;
    }
    const interval = document.querySelector('#interval');
    const intervalInput = document.querySelector('#interval-input');
    intervalInput.addEventListener('keyup', function(event) {
        if(event.keyCode === 13) {
            reflectChange(interval, event.target.value.replace(/\D/g, ''));
        }
    });
    interval.oninput = function() {
        intervalInput.value = this.value;
    }

    function addArray(array) {
        let sum = 0;
        for(let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }

    function delayRetry() {
        let maximumAttempts = Math.min(50, attempts.value || 50);
        let backupCoefficient = backOff.value || 2;
        let initialInterval = initial.value || 1000;
        let maximumInterval = interval.value || Number.POSITIVE_INFINITY;
        const labels = [];
        const values = [];
        let interim = initialInterval;
        for (let i = 0; i < maximumAttempts; ++i) {
        labels.push(i + 1);
        const userInput = document.querySelector(`#new-item-input-${i+1}`);
        if(userInput == null) return;
        values.push(interim + userInput.value);
        interim = Math.min(interim * backupCoefficient, maximumInterval);
        }
        const result = addArray(values);
        const conclusion = document.querySelector('#display-result');
        if(start.value >= result) {
            conclusion.innerText = `Request Succeeds after ${result}`;
        } else {
            conclusion.innerText = `Request fails after ${result}`;
        }
    }
</script>