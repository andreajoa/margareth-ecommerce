const now = new Date();
console.log('Current date:', now.toDateString());

// Test the autism events
const marchEvent = new Date(2025, 2, 29, 23, 59, 59); // March 29, 2025
const novEvent = new Date(2025, 10, 28, 23, 59, 59); // November 28, 2025

console.log('\nEvent dates:');
console.log('March event (2025):', marchEvent.toDateString());
console.log('November event (2025):', novEvent.toDateString());

console.log('\nHas passed:');
console.log('March event passed:', marchEvent < now);
console.log('November event passed:', novEvent < now);

// Since we're in 2026, both 2025 events have passed
// So they should be scheduled for 2026
const marchEvent2026 = new Date(2026, 2, 29, 23, 59, 59); // March 29, 2026
const novEvent2026 = new Date(2026, 10, 28, 23, 59, 59); // November 28, 2026

console.log('\n2026 Event dates:');
console.log('March 2026 event:', marchEvent2026.toDateString());
console.log('November 2026 event:', novEvent2026.toDateString());

console.log('\nTime until March 2026 event:');
const diffMarch = marchEvent2026.getTime() - now.getTime();
const daysMarch = Math.floor(diffMarch / (1000 * 60 * 60 * 24));
console.log(daysMarch + ' days remaining');

console.log('\nTime until November 2026 event:');
const diffNov = novEvent2026.getTime() - now.getTime();
const daysNov = Math.floor(diffNov / (1000 * 60 * 60 * 24));
console.log(daysNov + ' days remaining');

console.log('\nThe next event should be March 29, 2026 (closest)');