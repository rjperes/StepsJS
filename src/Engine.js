import Context from './context';

// Import commands
import Ajax from './commands/ajax';
import Click from './commands/click';
import Condition from './commands/condition';
import ExecuteScript from './commands/executescript';
import FindElement from './commands/findelement';
import GetContent from './commands/getcontent';
import GoTo from './commands/goto';
import InsertScript from './commands/insertscript';
import ExecuteScriptAsync from './commands/executescriptasync';
import Log from './commands/log';
import Navigate from './commands/navigate';
import SelectValue from './commands/selectvalue';
import SetValue from './commands/setvalue';
import SetVariable from './commands/setvariable';
import Stop from './commands/stop';
import TakeScreenshot from './commands/takescreenshot';
import VariableEvaluation from './commands/variableevaluation';
import Wait from './commands/wait';

const COMMANDS = {
    Ajax: Ajax,
    Click: Click,
    Condition: Condition,
    ExecuteScript: ExecuteScript,
    ExecuteScriptAsync: ExecuteScriptAsync,
    FindElement: FindElement,
    GetContent: GetContent,
    GoTo: GoTo,
    InsertScript: InsertScript,
    Log: Log,
    Navigate: Navigate,
    SelectValue: SelectValue,
    SetValue: SetValue,
    SetVariable: SetVariable,
    Stop: Stop,
    TakeScreenshot: TakeScreenshot,
    VariableEvaluation: VariableEvaluation,
    Wait: Wait
};

const EXECUTION_SUCCESS_KEY = "success";
const EXECUTION_RESULT_ERROR_KEY = "error";
const STOP_MESSAGE_KEY = "stopMessage";

export default class Engine {
    constructor(driver, webdriver) {
        if (!driver
            || !webdriver) {
            throw new Error(`Driver and Webdriver are needed to create an Engine.`);
        }

        this.driver = driver;
        this.webdriver = webdriver;
        this.onerror = null;
        this.executionSteps = {
            currentIndex: null,
            steps: []
        };

        this.context = new Context();
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
        let stepId = this.executionSteps.steps[this.executionSteps.currentIndex].id || this.executionSteps.currentIndex
        console.log(`\nStep ${stepId} started.`);

        let stepStartTime = Date.now();

        return this.executeStep(this.executionSteps.steps[this.executionSteps.currentIndex], this.executionSteps.currentIndex)
            .then((res) => {
                let stepExecutionTime = (Date.now() - stepStartTime) / 1000;
                console.log(`Step ${this.executionSteps.currentIndex } finished. Execution time: ${stepExecutionTime}s.`);

                this.executionSteps.currentIndex++;

                if (this.executionSteps.currentIndex < this.executionSteps.steps.length) {
                    return this.runStep();
                }
            })
    }

    run(steps) {
        this.executionSteps.steps = steps;
        this.executionSteps.currentIndex = 0;

        let startTime = Date.now();
        console.log(`Engine started\n`);

        // Run first step
        return this.runStep()
            .then((res) => {
                let executionTime = (Date.now() - startTime) / 1000;
                console.log(`\nEngine finished with success.`);
                console.log(`Execution time: ${executionTime}s.`);

                let stopMessage = this.context.getSavedData(STOP_MESSAGE_KEY);
                if (stopMessage) {
                    this.context.saveData(EXECUTION_SUCCESS_KEY, false);
                    this.context.saveData(EXECUTION_RESULT_ERROR_KEY, stopMessage);
                    console.log(`\nStop message: ${stopMessage}\n`);
                } else {
                    this.context.saveData(EXECUTION_SUCCESS_KEY, true);
                }

                return this.postExecution();
            })
            .catch(err => {
                console.log(`\nEngine finished with error: ${err.toString()}`);
                this.context.saveData(EXECUTION_SUCCESS_KEY, false);

                let errorResponse = {
                    error: err.toString(),
                    step: this.executionSteps.steps[this.executionSteps.currentIndex]
                };

                this.context.saveData(EXECUTION_RESULT_ERROR_KEY, errorResponse);

                return this.postExecution();
            });
    }

    postExecution() {
        return this.context.getContextData();
    }
}
