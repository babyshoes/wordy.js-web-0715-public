'use strict';

function isolateNumbers(input){
  return input.match(/-?\d+/g);
}

function isolateOperation(input){
  var x = input.match(/-?\d+\s(.*)\s-?\d+/)[1];
  var y = x.split(' ');
  if(y.length > 1) {
    return y.filter(function(e) {if(e.length>2) {return e}})
  } else if (y.length === 1) {
    return y[0];
  }
}

function convertOperation(word){
  if(word==='plus'){
    return '+';
  } else if (word==='minus'){
    return '-';
  } else if (word==='multiplied'){
    return '*';
  } else if (word==='divided'){
    return '/';
  }
}

function convertOperations(words) {
  var operations = words.map(function(word) {return convertOperation(word)});
  return operations;
}

function determineOperations(input) {
  if(typeof input === "string") {
    return convertOperation(input)
  } else {
    return convertOperations(input)
  }
}

function operateTwoNumbers(num1, operand, num2) {
  return eval(num1 + ' ' + operand + ' ' + num2);
}

function operateThreeNumbers(num1, operand1, num2, operand2, num3) {
  return operateTwoNumbers(operateTwoNumbers(num1, operand1, num2), operand2, num3)
}

function WordProblem(question){
  this.question = question;
  this.numbers = isolateNumbers(question);
  this.operation = '';
}

WordProblem.prototype.answer = function () {
  if(this.numbers == null || this.numbers.length <=1) {
    throw new ArgumentError;
  } else if(this.numbers.length===2) {
    this.operation = determineOperations(isolateOperation(this.question));
    return operateTwoNumbers(this.numbers[0], this.operation, this.numbers[1]);
  } else if(this.numbers.length===3){
    this.operation = determineOperations(isolateOperation(this.question));
    return operateThreeNumbers(this.numbers[0], this.operation[0], this.numbers[1], this.operation[1], this.numbers[2]);
  }
};

function ArgumentError(){
  this.name = 'ArgumentError';
  this.message = 'does not compute';
  // this.stack = (new Error()).stack;
}
