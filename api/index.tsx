import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { pinata } from 'frog/hubs';
import { neynar } from 'frog/middlewares';
import { serveStatic } from 'frog/serve-static';
import { handle } from 'frog/vercel';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// };

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  })
);

app.frame('/', (c) => {
  const { status, frameData } = c;

  console.log('frameData:', frameData);

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#800080', // Latar belakang ungu
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: '#800080', // Latar belakang ungu
            borderRadius: '10px',
            color: '#FFFFFF', // Teks putih
            fontSize: 56,
            padding: '20px',
            fontWeight: 'bolder',
            whiteSpace: 'pre-wrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '244px',
            }}
          >
            🐶
          </div>
          <div
            style={{
              fontSize: '64px', // Ukuran teks lebih besar
              fontWeight: '900', // Lebih tebal
              textTransform: 'uppercase', // Semua huruf kapital
              letterSpacing: '2px', // Spasi antar huruf
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Efek bayangan
            }}
          >
            {status === 'response' ? `Claim $FDOG` : 'Claim Your Reward $FDOG Now'}
          </div>
        </div>
      </div>
    ),
    intents: [
      // Tombol "Claim Now" baru di sebelah tombol "Cast It"
      <Button.Link
        href="https://farcasterdog.xyz/referral/314233"
        style={{
          marginRight: '10px', // Memberi jarak di sebelah tombol "Cast It"
        }}
      >
        🎁Claim Now
      </Button.Link>,
      // Tombol "Cast It" yang sudah ada
      <Button.Link
        href="https://warpcast.com/~/compose?text=I claim $FDOG reward using Frame by @0xhen
%20Please claim your reward 👉 Follow @farcaster-dogg&embeds[]=https://claim-fdog-frame.vercel.app/api"
      >
        🕵‍♀Share with friends
      </Button.Link>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
