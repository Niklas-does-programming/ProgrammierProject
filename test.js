import pkg from 'enquirer';
const { Input } = pkg;
const prompt = new Input({
  message: 'What is your username?',
  initial: 'jonschlinkert'
});

prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.log);