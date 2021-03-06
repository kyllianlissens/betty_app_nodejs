import moment from 'moment';
import Betty from '../betty';

moment.locale('nl');

const messages = [
  'Dat ben jij natuurlijk {user}!',
  'Wie anders dan {user}?',
  'Ongetwijfeld is dat {user}',
  'Checking git commits ..... result: {user}',
];

export default function handle(event) {
  const sentence = event.text.replace(/[.,?!;()"'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();

  if (sentence.indexOf('wie is de beste') !== -1) {
    try {
      Betty.getSlackUser(event.user).then((user) => {
        const resp = {
          message: messages[Math.floor(Math.random() * messages.length)].replace('{user}', user.user.real_name),
          channel: event.channel,
        };
        Betty.emit('response', resp);
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    return false;
  }
  return true;
}
