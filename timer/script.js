class FlipTimer {
    constructor() {
        this.hoursElement = document.querySelector('.hours');
        this.minutesElement = document.querySelector('.minutes');
        this.secondsElement = document.querySelector('.seconds');
        
        this.startBtn = document.querySelector('.start-btn');
        this.stopBtn = document.querySelector('.stop-btn');
        this.resetBtn = document.querySelector('.reset-btn');
        
        this.interval = null;
        this.time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        this.bindEvents();
        this.updateDisplay();  // Initialize display
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    updateDisplay() {
        this.updateSection(this.hoursElement, this.time.hours);
        this.updateSection(this.minutesElement, this.time.minutes);
        this.updateSection(this.secondsElement, this.time.seconds);
    }

    updateSection(element, value) {
        const formattedValue = value.toString().padStart(2, '0');
        const currentValue = element.querySelector('.top').textContent;
        
        if (currentValue !== formattedValue) {
            element.classList.add('flip');
            setTimeout(() => {
                element.querySelector('.top').textContent = formattedValue;
                element.querySelector('.bottom').textContent = formattedValue;
                element.classList.remove('flip');
            }, 300);
        }
    }

    start() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.time.seconds++;
                if (this.time.seconds >= 60) {
                    this.time.seconds = 0;
                    this.time.minutes++;
                    if (this.time.minutes >= 60) {
                        this.time.minutes = 0;
                        this.time.hours++;
                        if (this.time.hours >= 100) {
                            this.stop();
                            return;
                        }
                    }
                }
                this.updateDisplay();
            }, 1000);
        }
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    reset() {
        this.stop();
        this.time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this.updateDisplay();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlipTimer();
});