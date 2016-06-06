// Import commands
import Ajax from './commands/ajax';
import Click from './commands/click';
import Condition from './commands/condition';
import ExecuteScript from './commands/execute-script';
import FindElement from './commands/find-element';
import GetContent from './commands/get-content';
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

const COMMANDS = {
    Ajax: Ajax,
    Click: Click,
    Condition: Condition,
    ExecuteScript: ExecuteScript,
    FindElement: FindElement,
    GetContent: GetContent,
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

        this._context = {
            savedData: []
        };
    }

    saveData(dataKey, dataValue) {
        this._context.savedData[dataKey] = dataValue.toString();
    }

    executeStep(step, index) {
        let command = step.command;

        let stepCommand = COMMANDS[command];

        if (!stepCommand) {
            throw new Error(`Command "${command.toString()}" not found.`);
        }

        let args = {index: index};

        for (let p in step) {
            if (p !== 'command') {
                args[p] = step[p];
            }
        }

        let cmd = new stepCommand();

        return cmd.execute(this, args);
    }

    runStep() {
        console.log(`\nStep ${this.currentStepIndex} started.`);

        let stepStartTime = Date.now();

        return this.executeStep(this.executionSteps.steps[this.currentStepIndex], this.currentStepIndex)
            .then((res) => {
                let stepExecutionTime = (Date.now() - stepStartTime) / 1000;
                console.log(`Step ${this.currentStepIndex} finished. Execution time: ${stepExecutionTime}s.`);

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
        console.log(`Engine started\n`);

        // Run first step
        this.runStep()
            .then(() => {
                let executionTime = (Date.now() - startTime) / 1000;
                console.log(`\nEngine finished.`)
                console.log(`Execution time: ${executionTime}s.`);

                this.postExecution();
            });
    }

    postExecution() {
        
    }
}
