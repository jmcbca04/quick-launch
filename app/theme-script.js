export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              document.documentElement.setAttribute('data-theme', 'dark');
            } catch (e) {
              console.log('Theme initialization error:', e);
            }
          })();
        `,
      }}
    />
  );
} 