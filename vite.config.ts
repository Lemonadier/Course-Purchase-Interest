
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
    return {
      define: {
        'process.env.DISCORD_WEBHOOK_URL': JSON.stringify("https://discord.com/api/webhooks/1393344731530137600/Ueu2Zkl65XgrY-YJzb5CWzUGUtgrteoIz5giYO0EhUepoFwGspKh2olmVhju3JAOnANK")
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});