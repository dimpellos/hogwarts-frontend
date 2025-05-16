import '../styles/globals.css';

export const metadata = {
    title: 'Hogwarts Houses',
    description: 'Search and display Hogwarts houses',
  };
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  