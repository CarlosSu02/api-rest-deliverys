
import App from './app';
import 'dotenv/config';

App.listen(process.env.APP_PORT as unknown as number || 4000);
