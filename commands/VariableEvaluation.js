var Step = require('./Step');

function VariableEvaluation() {
}

var Operator = {
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

VariableEvaluation.prototype = new Step();
VariableEvaluation.prototype.constructor = VariableEvaluation;
VariableEvaluation.prototype.super = Step.prototype;
VariableEvaluation.prototype.run = function (engine, args) {
    var driver = engine.driver;
    var variable = args.variable;
    var operator = args.operator || Operator.Equal;
    var operand = args.operand || '';
    var trueBranch = args['true'];
    var falseBranch = args['false'];

    if (variable && driver.variables && driver.variables[variable]) {
        var value = driver.variables[variable];
        var result = null;

        switch (operator) {
            case Operator.Contains:
                result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) >= 0);
                break;

            case Operator.NotContains:
                result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) < 0);
                break;

            case Operator.StartsWith:
                result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) === 0);
                break;

            case Operator.EndsWith:
                result = (value.toString().toUpperCase().indexOf(operand.toString().toUpperCase()) === (operand.toString().length - value.toString().length));
                break;

            case Operator.Equal:
                result = (value == operand);
                break;

            case Operator.Different:
                result = (value != operand);
                break;

            case Operator.Truthy:
                result = !!value;
                break;

            case Operator.Falsy:
                result = !value;
                break;

            case Operator.Greater:
                result = (parseFloat(value) > parseFloat(operand));
                break;

            case Operator.GreaterOrEqual:
                result = (parseFloat(value) >= parseFloat(operand));
                break;

            case Operator.Less:
                result = (parseFloat(value) < parseFloat(operand));
                break;

            case Operator.LessOrEqual:
                result = (parseFloat(value) <= parseFloat(operand));
                break;

            case Operator.Regex:
                result = new RegExp(operand).test(value.toString());
                break;

            default:
                return this.cancel('Unknown operator');
        }

        if (result === true) {
            console.log('VariableEvaluation: executing true branch');
            return engine.executeStep(trueBranch, -1);
        } else if (result === false) {
            console.log('VariableEvaluation: executing false branch');
            return engine.executeStep(falseBranch, -1);
        }
    } else {
        return this.cancel('Variable not found');
    }
};

module.exports = VariableEvaluation;