import Step from './step';

const OPERATOR = {
    Contains: 'contains',
    NotContains: 'not-contains',
    StartsWith: 'starts-with',
    EndsWith: 'ends-with',
    Equal: 'equal',
    Different: 'different',
    Truthy: 'truthy',
    Falsy: 'falsy',
    Greater: 'greater',
    GreaterOrEqual: 'greater-or-equal',
    Less: 'less',
    LessOrEqual: 'less-or-equal',
    Regex: 'regex'
};

export default class VariableEvaluation extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let variable = args.variable;
        let operator = args.operator || Operator.Equal;
        let operand = args.operand || '';
        let trueBranch = args['true'];
        let falseBranch = args['false'];

        if (variable && driver.variables && driver.variables[variable]) {
            let value = driver.variables[variable];
            let result = null;

            switch (operator) {
                case OPERATOR.Contains:
                    result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) >= 0);
                    break;

                case OPERATOR.NotContains:
                    result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) < 0);
                    break;

                case OPERATOR.StartsWith:
                    result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) === 0);
                    break;

                case OPERATOR.EndsWith:
                    result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) === (operand.toString().length - value.toString().length));
                    break;

                case OPERATOR.Equal:
                    result = (value == operand);
                    break;

                case OPERATOR.Different:
                    result = (value != operand);
                    break;

                case OPERATOR.Truthy:
                    result = !!value;
                    break;

                case OPERATOR.Falsy:
                    result = !value;
                    break;

                case OPERATOR.Greater:
                    result = (parseFloat(value) > parseFloat(operand));
                    break;

                case OPERATOR.GreaterOrEqual:
                    result = (parseFloat(value) >= parseFloat(operand));
                    break;

                case OPERATOR.Less:
                    result = (parseFloat(value) < parseFloat(operand));
                    break;

                case OPERATOR.LessOrEqual:
                    result = (parseFloat(value) <= parseFloat(operand));
                    break;

                case OPERATOR.Regex:
                    result = new RegExp(operand).test(value.toString());
                    break;

                default:
                    return this.cancel(`Unknown operator`);
            }

            if (result === true) {
                console.log(`VariableEvaluation: executing true branch`);
                return engine.executeStep(trueBranch, -1);
            } else if (result === false) {
                console.log(`VariableEvaluation: executing false branch`);
                return engine.executeStep(falseBranch, -1);
            }
        } else {
            return this.cancel(`Variable not found`);
        }
    }
}