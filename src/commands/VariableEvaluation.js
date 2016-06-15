import Step from './step';

const OPERATOR = {
    Contains: 'contains',
    NotContains: 'notContains',
    StartsWith: 'startsWith',
    EndsWith: 'endsWith',
    Equal: 'equal',
    Different: 'different',
    Truthy: 'truthy',
    Falsy: 'falsy',
    Greater: 'greater',
    GreaterOrEqual: 'greaterOrEqual',
    Less: 'less',
    LessOrEqual: 'lessOrEqual',
    Regex: 'regex'
};

export default class VariableEvaluation extends Step {
    run(engine, args) {
        let variable = args.variable;
        let operator = args.operator || Operator.Equal;
        let operand = args.operand || '';
        let trueBranch = args['true'];
        let falseBranch = args['false'];

        let value = "";
        try{
            if (variable){
                value = engine.context.getSavedData(variable);
            }
        }
        catch(ex){}

        if (value) {
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
                    break;
            }

            if (result === true) {
                console.log(`VariableEvaluation: executing true branch`);
                return engine.executeStep(trueBranch, -1);
            }
        }

        console.log(`VariableEvaluation: executing false branch`);
        return engine.executeStep(falseBranch, -1);
    }
}