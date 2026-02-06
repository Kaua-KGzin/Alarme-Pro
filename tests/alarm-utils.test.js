const assert = require('assert');
const { generateMathProblem, shouldAlarmRing, getRepeatText } = require('../alarm-utils.js');

(function testGenerateMathProblemDeterministic() {
  let calls = 0;
  const seq = [0, 0, 0.1];
  const problem = generateMathProblem(() => seq[calls++]);
  assert.strictEqual(problem.question, '1 + 1');
  assert.strictEqual(problem.answer, 2);
})();

(function testShouldAlarmRing() {
  const alarm = { enabled: true, time: '08:30', repeat: [1, 2, 3] };
  assert.strictEqual(shouldAlarmRing(alarm, '08:30', 2, false), true);
  assert.strictEqual(shouldAlarmRing(alarm, '08:31', 2, false), false);
  assert.strictEqual(shouldAlarmRing(alarm, '08:30', 0, false), false);
  assert.strictEqual(shouldAlarmRing(alarm, '08:30', 2, true), false);
})();

(function testGetRepeatText() {
  const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  assert.strictEqual(getRepeatText([], weekdays), 'Uma vez');
  assert.strictEqual(getRepeatText([0, 1, 2, 3, 4, 5, 6], weekdays), 'Todos os dias');
  assert.strictEqual(getRepeatText([1, 2, 3, 4, 5], weekdays), 'Dias úteis');
})();

console.log('alarm-utils tests passed');
