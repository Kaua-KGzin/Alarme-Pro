(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AlarmUtils = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  function generateMathProblem(randomFn) {
    const rand = typeof randomFn === 'function' ? randomFn : Math.random;
    const num1 = Math.floor(rand() * 20) + 1;
    const num2 = Math.floor(rand() * 20) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(rand() * operations.length)];

    let answer;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      default:
        answer = num1 * num2;
        break;
    }

    return {
      question: `${num1} ${operation} ${num2}`,
      answer,
    };
  }

  function shouldAlarmRing(alarm, timeStr, currentDay, hasActiveAlarm) {
    if (!alarm || !alarm.enabled || hasActiveAlarm) return false;
    if (alarm.time !== timeStr) return false;
    return alarm.repeat.length === 0 || alarm.repeat.includes(currentDay);
  }

  function getRepeatText(repeat, weekdays) {
    if (repeat.length === 0) return 'Uma vez';
    if (repeat.length === 7) return 'Todos os dias';
    if (repeat.length === 5 && !repeat.includes(0) && !repeat.includes(6)) return 'Dias úteis';
    if (repeat.length === 2 && repeat.includes(0) && repeat.includes(6)) return 'Finais de semana';
    return repeat.map((d) => weekdays[d]).join(', ');
  }

  return {
    generateMathProblem,
    shouldAlarmRing,
    getRepeatText,
  };
});
