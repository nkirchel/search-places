**1. Explain the output of the following code and why:**

`setTimeout(function() {` 

`console.log("1");`

`}, 100);` 

`console.log("2");`

The code will output in the console logs “2” then “1” 100 milliseconds later. This is because of the “setTimeout” method, which allows for functions to be executed after a period of time, in this case 100 which is 100 milliseconds. The second console log is not wrapped in a setTimeout method and so will fire once the program reaches that line of code.



**2. Explain the output of the following code and why:**

`function foo(d) {` 

`if(d < 10) {` 

`foo(d+1);` 

`}` 

`console.log(d);` 

`}` 

`foo(0);` 

The code will output in the console logs numbers from “0” to “10”. This is because of the nature of the method “foo” being a conditional recursive function, which means it calls itself within its function if conditions are met.  The program first calls “foo” with the value of 0, meaning the method will meet the condition to recursively call itself 10 times as the value passed into each call is incremented by 1 is less than 10, until it reaches that value, it will repeat. 	



**3. If nothing is provided to foo we want the default response to be 5. Explain the potential issue with the following code:**

`function foo(d) {` 

`d = d || 5;` 

`console.log(d);` 

`}`

If the method is to process numbers only, this would be a major issue as there are no type checks for the passed in value. It would be better to validate the values that is passed in before executing code with it. If the method is to only process numbers, a 'guard' to see if the parameter is a number should be added, otherwise any kind of type can be executed.



An example of a guard could be: 

`d = isNaN(d) ? 5 : parseFloat(d);`

this checks if the value provided is a number, if it is, it will parseFloat (in case the value is a number but in string format “6” etc). If it fails the above check, it will default to 5.



**4. Explain the output of the following code and why:**

`function foo(a) {` 

`return function(b) {` 

`return a + b;` 

`}}` 

`const bar = foo(1);` 

`console.log(bar(2));` 

“foo” is a function that accepts a parameter “a” and is used in the function it returns which adds that value with “b”. The variable “bar” is a reference to this function using a value of 1 for the variable “a”. Anytime “bar” is called, the value passed in the function will be added with the value in “bar”'s reference to the function “foo” which has a value of 1 for “a”.

This results the console log outputting 3.



**5. Explain how the following function would be used:**

`function double(a, done){` 

`setTimeout(function() {` 

`done(a * 2);` 

`}, 100);` 

`}` 

The function “double” is expecting a call back function (named as “done” in the method) to be called after the “setTimeout” method has completed, to then execute the callback function with the results passed in the parameter. 

How this function would be used is this: 

`double(4, (value)=>{ 		`

`console.log(value);`

`});` 

Value is what was passed in the “done” method in the double method. 	