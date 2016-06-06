// Import commands
import Ajax from './commands/ajax';
import Click from './commands/click';
import Condition from './commands/condition';
import ExecuteScript from './commands/execute-script';
import FindElement from './commands/find-element';
import Goto from './commands/go-to';
import InsertScript from './commands/insert-script';
import Log from './commands/log';
import Navigate from './commands/navigate';
import SetValue from './commands/set-value';
import SetVariable from './commands/set-variable';
import Stop from './commands/stop';
import TakeScreenshot from './commands/take-screenshot';
import VariableEvaluation from './commands/variable-evaluation';
import Wait from './commands/wait';

export default class Engine {
    constructor(driver, webdriver) {
        if (!driver
            || !webdriver) {
            throw new Error(`Driver and Webdriver are needed to create an Engine.`);
        }

        this.driver = driver;
        this.webdriver = webdriver;
        this.steps = [];
        this.onerror = null;
        this.executionSteps = {
            currentIndex: null,
            steps: []
        };

        this.commands = {
            Ajax: Ajax,
            Click: Click,
            Condition: Condition,
            ExecuteScript: ExecuteScript,
            FindElement: FindElement,
            Goto: Goto,
            InsertScript: InsertScript,
            Log: Log,
            Navigate: Navigate,
            SetValue: SetValue,
            SetVariable: SetVariable,
            Stop: Stop,
            TakeScreenshot: TakeScreenshot,
            VariableEvaluation: VariableEvaluation,
            Wait: Wait
        };
    }

    executeStep(step, index) {
        console.log(`Execute step: ${index}`);

        let command = step.command;

        if (!this.commands[command]) {
            throw new Error(`Command "${command.toString()}" not found.`);
        }

        let func = this.commands[command];

        let args = {index: index};

        for (let p in step) {
            if (p !== 'command') {
                args[p] = step[p];
            }
        }

        let s = new func();

        return s.execute(this, args);
    }

    runStep() {
        console.log(`Run step: ${this.currentStepIndex}`);

        return this.executeStep(this.executionSteps.steps[this.currentStepIndex], this.currentStepIndex)
            .then((res) => {
                console.log(`Execute step ${this.currentStepIndex} finished`);

                this.currentStepIndex++;

                if (this.currentStepIndex < this.executionSteps.steps.length) {
                    this.runStep();
                }
            });
    }

    run(steps) {
        this.steps = steps;
        this.executionSteps.steps = steps;
        this.currentStepIndex = 0;

        let startTime = Date.now();
        console.log(`Engine started`);

        // Run first step
        this.runStep()
            .then(() => {
                let executionTime = (Date.now() - startTime) / 1000;
                console.log(`Engine finished.`)
                console.log(`Execution time: ${executionTime}s.`);
            });
    }
}
