var fib = [0, 1];

do {
    var last = fib[fib.length - 1];
    var secondToLast = fib[fib.length - 2];
    fib.push(last + secondToLast)
    window.alert(fib.join(' ,'));
} while( window.confirm('Calculate next value in Fibonacci number?') );