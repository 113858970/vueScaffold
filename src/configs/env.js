
const env = {
  url: ''
};
if (process.env.NODE_ENV === 'development') {
  env.url = 'https://twin-ui.com/demo/';
} else if (process.env.NODE_ENV === 'production') {
  env.url = 'https://twin-ui.com/demo/';
}
export default env;
